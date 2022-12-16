package git

import (
	"errors"
	"github.com/go-git/go-git/v5"
	"github.com/go-git/go-git/v5/plumbing/object"
	gitHttp "github.com/go-git/go-git/v5/plumbing/transport/http"
	"os"
	"time"
)

var auth = &gitHttp.BasicAuth{
	Username: "KatharinaSick",
	Password: os.Getenv("GITHUB_TOKEN"),
}

func Clone(checkoutDir string) error {
	// Delete checkout dir if it exists (I know it would be better to just do a fetch/pull but let's keep it simple)
	err := os.RemoveAll(checkoutDir)
	if err != nil && !os.IsNotExist(err) {
		return errors.New("failed to delete git checkout dir")
	}

	// Clone the repository containing all pictures
	_, err = git.PlainClone(checkoutDir, false, &git.CloneOptions{
		URL:      "https://github.com/KatharinaSick/ofen-froschhauser-portfolio",
		Auth:     auth,
		Progress: os.Stdout,
	})

	if err != nil {
		return errors.New("failed to clone git repository")
	}

	return nil
}

func CommitAndPush(checkoutDir string) error {
	repo, err := git.PlainOpen(checkoutDir)
	if err != nil {
		return err
	}

	workTree, err := repo.Worktree()
	if err != nil {
		return err
	}

	err = workTree.AddGlob(".")
	if err != nil {
		return err
	}

	_, err = workTree.Commit("add new images", &git.CommitOptions{
		Author: &object.Signature{
			Name: "Ofen Froschhauser Server",
			When: time.Now(),
		},
	})
	if err != nil {
		return err
	}

	err = repo.Push(&git.PushOptions{
		Auth: auth,
	})
	if err != nil {
		return err
	}
	return nil
}
