# OpenPicker

OpenPicker is an open source and self hosted file picker for your websites. 


# Installation
### Deploy to Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/gauravtiwari5050/OpenPickerHeroku)

### Deploy to your server using npm
```sh
$ npm i -g openpicker
$ npm i -g coffeescript
```
### Start the server
```sh
$ openpicker
```
## USAGE
### Include the openpicker script in your file
```code
<script type="text/javascript">
      (function(window,document) {
        window.openpicker = {};
        var op = document.createElement('script'); op.type = 'text/javascript'; op.async = true;
        op.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + '<ADD_YOUR_SERVER_HERE>/script/v1.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(op, s);
      })(window,document);
    </script>  
```
### Pick single image
OpenPicker defaults to picking Image
```code
    openpicker.getImage(function(openpickerResponse){
            $('#image').attr('src',openpickerResponse.file.url);
    });
```
### Pick multiple images
OpenPicker defaults to picking Image
```code
    openpicker.getImages(function(openpickerResponse){
            console.log(openpickerResponse.files);
    });
```
### Pick single file of any type
OpenPicker defaults to picking Image
```code
    openpicker.getFile(function(openpickerResponse){
            console.log(openpickerResponse.file);
    });
```
### Pick files by mimetype (more details on options in the sections below)
OpenPicker defaults to picking Image
```code
    openpicker.getFile(
        {
            mimetypes: 'application/pdf'
        }
        function(openpickerResponse){
            console.log(openpickerResponse.file);
        }
    );
```
### Crop/Rotate Image before uploading
OpenPicker defaults to picking Image
```code
    openpicker.getImage(
        {
            conversions:['crop','rotate'],
            cropRatio:16/9,
        }
        function(openpickerResponse){
            console.log(openpickerResponse.file);
        }
    );
```

### Pick multiples files of any type
OpenPicker defaults to picking Image
```code
    openpicker.getFiles(function(openpickerResponse){
            console.log(openpickerResponse.files);
    });
```

### Using Jquery

```code
    <script
        src="https://code.jquery.com/jquery-3.2.1.min.js"
        integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
        crossorigin="anonymous"></script>
    <script charset="utf-8" type="text/javascript">
        $(function () {
            $('#opbutton').click(function () {
                window.openpicker.getFiles({
                    mimetypes: "image/*",
                    conversions: ['crop', 'rotate'],
                    cropRatio: 0 / 0,
                    subDirectory: 'your_usage_based_foler_name'
                }, function (openpickerResponse) {
                    $('#opurl').text(openpickerResponse.file.url);
                    console.log(openpickerResponse);
                });
            });
        });
    </script>
    <button id="opbutton"> Click here</button>
    <h1 id="opurl"></h1>
```
### Using AngularJs

#### template
```code
    <div ng-app="opApp">
	    <div ng-controller="opController">
						<md-button style="background-color:
						rgb(3,155,229); 
						font-weight: bolder; 
						padding: 2px 15px"
                           class="md-raised" 
                           ng-click="vm.openPicker($event)" 
                           aria-label="Add">
                    Create
                </md-button>
		</div>
    </div>
    
```

#### controller
```code
    (function () {
    'use strict';
    angular
        .module('opApp')
        .controller('opController', opController);

    /* @ngInject */
    function opController() {

        var vm = this;
        vm.openPicker = function (e) {
            window.openpicker.getFiles({
                mimetypes: "image/*",
                conversions: ['crop', 'rotate'],
                cropRatio: 0 / 0,
                subDirectory: <your_usage_based_foler_name>,
                multiple : false
            }, function (openpickerResponse) {
                console.log(openpickerResponse.files);
            });
        };
    }
})();

    
```

# Server Configuration
OpenPicker expects a properties.conf file in the working directory. You can set the following options. You can set all the options in environment variables as well. Environment variables are given preference if set while reading a property.
```sh
FILESTORES=disk,s3 <comma seperated list, default: disk, only s3 and disk are supported as of now>
UPLOAD_DIRECTORY=<full path to disk location where you want to save files, default is ./uploads>
TEMPORARY_DIRECTORY=<full path to disk location where you want to save files temporarily, default is ./tmp> 

ALLOWED_MIME_TYPES_REGEX = regex to give allowed mime types , default is 
/.(avi|wmv|flv|mpg|3gp|mkv|mp4|mpeg|mpeg-1|mpeg-2|mpeg-3|mpeg-4|mp3|wav|xlsx?|zip|7z|docx?|pptx?|pdf|jpe?g|png|gif|csv|comma-separated-values)$/i

ALLOWED_IMAGE_TYPES_REGEX = regex to give allowed image types , default is 
/.(jpe?g|png|gif)$/i

MIN_SIZE=minimum file size in bytes
MAX_SIZE=maximum file size in bytes
S3_BUCKET = name of s3 bucket
AWS_ACCESS_KEY_ID= Aws access key if you have configured s3 as a filestore
AWS_SECRET_ACCESS_KEY = Aws secret access key
AWS_REGION = Aws Region of the bucket where you are uploading the files

```
# Client Configuration
### Available Fileupload Channels
    - MY_COMPUTER  : Allows uploading file from current device
### Client Options - 
All these are optional , pass these while invoking openpicker.getFile()

    - mimetypes : Comma seperated list of mimetypes (Ex: image/*,application/pdf)
    - conversions : ['crop','rotate'] 
    - cropRatio : Ex 16/9 - used while cropping the image, 0/0 to random aspect ratio
    - channels : ['MY_COMPUTER'] - lets the client control channels to be used in the picker
    - multiple: true// for multiple files and false for single file
    - subDirectory : A variable name to upload files in different folders under base directory set in properties.conf file

OpenPicker uses a number of open source projects to work properly:
* [NgFileUpload] - Angular Directive to upload files by [@danialfarid]
* [Cropper] - jQuery plugin to crop images by [@fengyuanchen]
* [Connect Multiparty] - express middleware used in file uploads by [@andrewrk]
* [AngularJS] - HTML enhanced for web apps!
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Request] - Simplified HTTP client.
* [Pretty Size] - Helper utility to provide pretty printed file sizes (best used for logging or CLI output).

And of course OpenOpicker itself is open source with a [public repository][openpicker]
 on GitHub.

### Todos

 - Write Tests
 - Add more channels
 - Add more filestores
 - Editor Integrations like Quill.js

Contributors
-------------

 - [Gaurav Tiwari](<https://github.com/gauravtiwari5050>)
 - [Mohd Sanad Zaki Rizvi](<https://github.com/mohdsanadzakirizvi>)
 - [Atul Joshi](<https://github.com/ajoshi31>)

License
----

MIT



   [NgFileUpload]: <https://github.com/danialfarid/ng-file-upload>
   [@danialfarid]: <https://github.com/danialfarid>
   [openpicker]: <https://github.com/gauravtiwari5050/OpenPicker>
   [Cropper]: <https://github.com/fengyuanchen/cropper>
   [@fengyuanchen]: <https://github.com/fengyuanchen>
   [@thomasfuchs]: <http://twitter.com/thomasfuchs>
   [Connect Multiparty]: <https://github.com/andrewrk/connect-multiparty>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [@andrewrk]: <https://github.com/andrewrk>
   [Request]: https://github.com/request/request
   [Pretty Size]: https://github.com/davglass/prettysize

