package main

import (
	"net/http"
	"ofen.froschhauser.net/files"
	"ofen.froschhauser.net/git"
	"os"
)

const checkoutDir = "./ofen-froschhauser-portfolio"

func upload(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	accessToken := r.Header.Get("X-Ofen-Access-Token")
	if accessToken != os.Getenv("ACCESS_TOKEN") {
		http.Error(w, "invalid access token", http.StatusUnauthorized)
		return
	}
	err := git.Clone(checkoutDir)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	existingImages, err := files.GetExistingImages(checkoutDir)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	images, err := files.Copy(w, r, checkoutDir, existingImages)
	if err != nil {
		if err == files.ErrFileTypeNotAllowed {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		} else {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	err = files.WriteImagesToFile(checkoutDir, images)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = git.CommitAndPush(checkoutDir)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Headers", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "*")
	(*w).Header().Set("Access-Control-Allow-Credentials", "true")
}
