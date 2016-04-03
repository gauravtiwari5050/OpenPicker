# OpenPicker

OpenPicker is an open source and self hosted file picker for your websites. 


# Installation

### Deploy using npm
```sh
$ npm i -g openpicker
```
### Start the server
```sh
$ openpicker
```
### Add Javascript to your site
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
# Server Configuration
OpenPicker expects a properties.conf file in the working directory. You can set the following options. You can set all the options in environment variables as well. Environment variables are given preference if set while reading a property.
```sh
FILESTORES=disk,s3 <comma seperated list, default: disk, only s3 and disk are supported as of now>

UPLPOAD_DIRECTORY=<full path to disk location where you want to save files, default is ./uploads>

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
    - cropRatio : Ex 16/9 - used while cropping the image
    - channels : ['MY_COMPUTER'] - lets the client control channels to be used in the picker

OpenPicker uses a number of open source projects to work properly:
* [NgFileUpload] - Angular Directive to upload files by [@danialfarid]
* [Cropper] - jQuery plugin to crop images by [@fengyuanchen]
* [Connect Multiparty] - express middleware used in file uploads by [@andrewrk]
* [AngularJS] - HTML enhanced for web apps!
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]

And of course OpenOpicker itself is open source with a [public repository][openpicker]
 on GitHub.

### Todos

 - Write Tests
 - Add more channels
 - Add more filestores

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


