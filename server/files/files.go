package files

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/nfnt/resize"
	"image/jpeg"
	"image/png"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
)

type Image struct {
	Filename string `json:"filename"`
}

var ErrFileTypeNotAllowed = errors.New("the provided file format is not allowed. Please upload a JPEG or PNG image")

func GetExistingImages(checkoutDirectory string) ([]Image, error) {
	imageJson, err := os.Open(fmt.Sprintf("%s/public/images/index.json", checkoutDirectory))
	if err != nil {
		return nil, err
	}
	defer imageJson.Close()

	var images []Image
	jsonBytes, err := io.ReadAll(imageJson)
	if err != nil {
		return nil, err
	}
	err = json.Unmarshal(jsonBytes, &images)
	if err != nil {
		return nil, err
	}

	return images, nil
}

func WriteImagesToFile(checkoutDir string, images []Image) error {
	f, err := os.Create(fmt.Sprintf("%s/public/images/index.json", checkoutDir))
	if err != nil {
		return err
	}
	defer f.Close()

	jsonBytes, err := json.Marshal(images)
	if err != nil {
		return err
	}
	_, err = f.Write(jsonBytes)
	if err != nil {
		return err
	}
	return nil
}

func Copy(w http.ResponseWriter, r *http.Request, checkoutDir string, images []Image) ([]Image, error) {
	// 32 MB is the default used by FormFile()
	if err := r.ParseMultipartForm(32 << 20); err != nil {
		return nil, err
	}

	files := r.MultipartForm.File["images"]
	fullsDir := fmt.Sprintf("%s/public/images/fulls", checkoutDir)
	thumbsDir := fmt.Sprintf("%s/public/images/thumbs", checkoutDir)

	numExistingImages := len(images)

	for index, fileHeader := range files {
		file, err := fileHeader.Open()
		if err != nil {
			return nil, err
		}

		defer file.Close()

		buff := make([]byte, 512)
		_, err = file.Read(buff)
		if err != nil {
			return nil, err
		}

		fileType := http.DetectContentType(buff)
		if fileType != "image/jpeg" && fileType != "image/png" {
			http.Error(w, "The provided file format is not allowed. Please upload a JPEG or PNG image", http.StatusBadRequest)
			return nil, ErrFileTypeNotAllowed
		}

		_, err = file.Seek(0, io.SeekStart)
		if err != nil {
			return nil, err
		}

		fileName := fmt.Sprintf("%d%s", numExistingImages+index, filepath.Ext(fileHeader.Filename))
		err = copyFullImage(file, fullsDir, fileName)
		if err != nil {
			return nil, err
		}
		err = createThumb(fullsDir, thumbsDir, fileName, fileType)
		if err != nil {
			return nil, err
		}
		images = append(images, Image{Filename: fileName})
	}
	return images, nil
}

func copyFullImage(original multipart.File, dir string, fileName string) error {
	newFile, err := os.Create(fmt.Sprintf("%s/%s", dir, fileName))
	if err != nil {
		return err
	}
	defer newFile.Close()

	_, err = io.Copy(newFile, original)
	if err != nil {
		return err
	}

	return nil
}

func createThumb(fullsDir string, thumbsDir string, fileName string, fileType string) error {
	in, err := os.Open(fmt.Sprintf("%s/%s", fullsDir, fileName))
	if err != nil {
		return err
	}
	defer in.Close()

	if fileType == "image/jpeg" {
		img, err := jpeg.Decode(in)
		if err != nil {
			return err
		}

		m := resize.Thumbnail(500, 1000, img, resize.Lanczos3)

		out, err := os.Create(fmt.Sprintf("%s/%s", thumbsDir, fileName))
		if err != nil {
			return err
		}
		defer out.Close()

		err = jpeg.Encode(out, m, nil)
		if err != nil {
			return err
		}
	} else if fileType == "image/png" {
		img, err := png.Decode(in)
		if err != nil {
			return err
		}

		m := resize.Thumbnail(500, 1000, img, resize.Lanczos3)

		out, err := os.Create(fmt.Sprintf("%s/%s", thumbsDir, fileName))
		if err != nil {
			return err
		}
		defer out.Close()

		err = png.Encode(out, m)
		if err != nil {
			return err
		}
	} else {
		return errors.New("invalid file type")
	}
	return nil
}
