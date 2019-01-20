import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fileUploadPoc';

  filesToUpload: Array<File>;

    constructor() {
        this.filesToUpload = [];
    }

    upload() {
        this.uploadFileRequest("http://localhost:8080/uploads", [], this.filesToUpload).then((result) => {
            console.log(result);
        }, (error) => {
            console.error(error);
        });
    }

    uploadToServer(fileInput: any){
        this.filesToUpload = <Array<File>> fileInput.files;
        // for Multiple file use below code 
        /*for(let file of fileInput.files) {
            this.filesToUpload.push(file);
        }*/
        this.upload();
    }

    uploadFileRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            for(var i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    }

}
