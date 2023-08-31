# Getting Started 🚀
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites 📋
You'll need Git and Node.js (which comes with NPM) installed on your computer. Sometimes this can require visual studio dev tools or a similar C++ object oriented environment to your machine, if not already present. 


~~node\@LTS or higher~~ `May want to use nvm to control node versions` <br />
`npm\@latest or higher` <br />
`pnpm\@latest or higher` <br />
`git\@latest or higher` <br />
`yarn@latest or higher` 

☝️ You may want to change package managers based on project needs. This is really up to you, but it is recommended to 
install these at a root/machine level so you can switch package managers more easily and have them easily accessible. 

☝️ It may help to have a package VERSION manager onboard as well, though this is not required to build. see NPX

☝️ Also, you can use Yarn instead of NPM

☝️ if a yarn lock file is present, it will use yarn for the build scripts. If you want to favor npm or pnpm, delete the yarn lock. 

☝️ **It is not recommended to try to deploy/host this starter on any cloud env, dropbox, docker, etc.** It has way too 
many parallel tasks and worker tasks that it will try to spin which may consume server/system/image resources. Rather,
clone the repo locally, and develop on a machine. Store your dist/prod output on those environments if remote testing is needed. 

## Installation - boilerplate 1.0.2

### Clone the repository
[colorincode-starter-bp](https://github.com/colorincode/colorincode-starter-bp.git)

run (using npm and yarn): 

~~~
npm i | npm i yarn
~~~

### Install dependencies
~~~
npm i @parcel/transformer-sass | npm i @parcel/resolver-glob | npm i glob
~~~

### File structure and project root directory 
The file structure has changed from version 1.0.2, the scss and ts folders are now located within the src folder. Update any import, function calls, and html links accordingly if using any older packages. 

**Your app root folder should contain the following files:**

~~~
.parcelrc | package.json (no lock) | tsconfig.json | sharp.config.json | yarn.lock | .prettierrc
~~~

~~~
.eslintignore | .prettierignore | .gitignore 
~~~

### Scaffolding 📁

**Your app scaffolding structure should look like:**

Generally you want to separate concerns and nest your components inside the TS and SCSS folders. For now, we have linked each one in the index, but there may be a better way to 
resolve this. 
~~~
|_dist 
|_src
    |_scss
    |_ts
    index.html
|_working-files
~~~

## How To Use 🔧
☝️ **successful build and start should produce the following folders:**

~~~
**dist | .parcel-cache | node_modules**
~~~

☝️npm scripts in package json have been re-ordered, as they need to be run in order to build on top of one another
running these out of orders can cause problems you don't need to fix at runtime/build.

## Troubleshooting & Help 😧 
See the links section if you want to quickly jump to a link
mentioned. 


### useful commands 
These are the most useful and common commands handy for development with this particular package. This particular package can break on rebuild, and it often it involves sass. 
Rebuilding the transformer and rebuild-node-sass seems to rectify that error. 
<br/> 
~~~
npm i @parcel/transformer-sass

npm i rebuild-node-sass

npm i --save @types/jquery
~~~

## Links 🔖

[font awesome](https://fontawesome.com/) <br/> 
[npmjs](https://www.npmjs.com/) <br/> 
[pnpm](https://pnpm.io/) <br/> 
[nvm](https://github.com/nvm-sh/nvm) <br/> 
[npx](https://docs.npmjs.com/cli/v7/commands/npx) <br/> 
[node-rebuild-sass](https://www.npmjs.com/package/rebuild-node-sass)


### parcel specific links
[@parcel/transformer-sass](https://www.npmjs.com/package/@parcel/transformer-sass) 

[parcel svg support](https://parceljs.org/languages/svg/)

[parcel plugins](https://parceljs.org/plugin-browser/)


## Images 📷
in our projects, non-working files should be placed in the assets folder of the root of the project so that we can run a default image compression. ALWAYS check your images to ensure there is not a great loss of quality. The goal of the assets folder is to be able to upload it as-is to a remote without having to relink images. Ensure that your assets folder is in the project root directory. 

### Resizing and converting images

Parcel includes an image transformer out of the box, which allows you to resize images, convert them to a different format, or adjust the quality to reduce file size. This can be done using query parameters when referencing the image, or using a configuration file.

The image transformer relies on the Sharp image transformation library, which will be automatically installed as a dev dependency into your project when needed.

### The query parameters you can use are:


> width – The width to resize the image to

> height – The height to resize the image to

> quality – The image quality percentage you want, for example ?quality=75

> as – File format to convert the image to, for example: ?as=webp


### Image formats 
#
The following image formats are supported, both as input and as output via the as query parameter:


> jpeg / jpg - JPEG is a very widely supported lossy image format. It\'s often used for photos, and offers reasonably good compression, but does not support transparency or lossless compression.

> png - Portable Network Graphics (PNG) is a lossless image format. PNGs are typically much larger than JPEGs or other lossy image formats, but support transparency and offer much higher quality for fine details.

> webp – WebP supports both lossy and lossless compression as well as animation and transparency. It\'s supported in all modern browsers, and offers better compression for the same quality as JPEGs and PNGs.

> avif – AVIF is a new lossy image format based on the AV1 video codec which offers significant compression and quality improvements over JPEG and WebP. It\'s currently supported in the latest versions of Chrome and Firefox.

> The following formats are also supported as inputs, but are not generally supported by browsers: tiff, heic / heif, and raw.


## Changelog and updates 🔔

### **Version 1.0.3** V1.0.3 08-16-2023 🔔
> added support for @use and @forward for SCSS partials
> package.json , index and scss files have been updated to reflect this support. on existing project folders, be sure to update package json, run npm update/i again

> added support for CSS nesting! Now (S)CSS can be nested within classes, including support for wrapping @media selectors into classes without a redeclaration. Be sure to polyfill or check browsers on dist for full support. existing mixins and functions in 
scss may need to be updated to support native nesting. 

> added support for SCSS native CSS (--var) variables to be used. This is a draft feature, so use with caution, and be sure to follow parcelJS guidelines for CSS vars, especially if globally accessed. Instead, target the root or wrap in @support @nest or other SCSS/parcel guidelines - but they should now build when targeted at the root

> changed SCSS files to use "helpers.scss" so any unused SCSS classes will be shaken from the tree. All partials now correctly
formatted to use @forward and @use rules over @imports, which should significantly improve ability to access variables without
having to change stylesheets. 

> modified index.html so it is now only taking in one TS and one SCSS file, no stacking necessary, should improve build and run
time significantly

> added structure and support for template partials with pug. There are now globals/footer/header so you can rope a pug file into
an the index or any HTML file. You can include a pug file with script, be sure to specify it is a module to avoid build errors.

> updated gitignore to ignore cache and dist files by default 

> assets folder needs to be nested within "src" for sharp image compression and optimization can occur on dist build




### **Breaking changes** - V1.0.2 07-11-23 🔔

> Added support for package exports and globs. this requires a .parcelrc file. This is not added by default as it is a setting that can cause existing packages to break. you will need to create a .parcelrc file with the following settings:

> You will need to make sure to change the file scaffolding and build tools as old files may not build properly if copying older project files or trying to migrate a project to this one. 

> postcssrc and cssnano.config.js files are removed to favor the Rust compiler settings for sass/css resolution instead of postCSS. this may break some packages. 

> added a clear cache script: **"rimraf --glob .parcel-cache/*",** should be possible to add a mac and windows compatable using ||

> added a clear distribution script: **"clear-dist": "rimraf --glob dist/*",**

> added a clear distribution and cache script **"npm run clear-dist && npm run clear-cache",**

> replace the U+002A unicode below with * character if implementing

> added a script to clean out the map files from the distribution folder **"rimraf --glob dist/[U+002AU+002A]/[U+002A].[U+002A].map",**

> changed the build script to avoid an error when dist has been cleared and parcel cache is looking for files, builds will take longer 

> **"npm run clear-cache && parcel build ./src/index.html --target web --no-optimize",**

> created a temporary production script **"npm run clean && yarn build && yarn start"**

> npm i @parcel/transformer-sass needs to be re-run from CLI and put in a different dependency mode in package json , node-rebuild-sass may be needed in some instances
> rimraf is now a project dep, so rimraf scripts can be run uniformly, agnostic of the env or machine. 
