![cover]([./public/imgs/cover.jpeg](https://github.com/quanta-quest/quanta-quest/blob/main/public/imgs/cover.jpeg))

<div>
  <p align="center">
    <a href="https://x.com/ethanfrostlove">
      <img src="https://img.shields.io/badge/Follow%20on%20X-000000?style=for-the-badge&logo=x&logoColor=white" alt="Follow on X" />
    </a>
    <a href="https://discord.gg/v5Ns5m7H">
      <img src="https://img.shields.io/badge/Join%20our%20Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Join our Discord" />
    </a>
  </p>
</div>

# What's Quanta Quest?

## Quanta Quest's goals

1. Help users easily store all their data from Gmail, Notion, Dropbox, Calendar, Docs, Drive, iCloud, etc. locally and process it with a vector database (important data localized for storage and backup, preventing data loss)

2. “Edge-side LLMs + personal data" ➡️ "Personalized, private, edge-side LLMs (important data localized)" ➡️ "The LLMs that knows you best, the most private LLMs". Use your personal data combined with increasingly common edge-side LLMs to train the safest, most privacy-focused, and most personalized edge-side LLMs that understands you best.

## Detailed Use Case Diagram

1. Asking "What newsletters have I subscribed to?"

![newsletters](https://quantaquestapp.com/imgs/newsletters.png)

2. Which AI projects have recently received funding?

![aistartups](https://quantaquestapp.com/imgs/aistartups.png)

# What's Quanta Quest App?

Quanta Quest App is a desktop application that allows users to connect and manage their data from Gmail, ~~ Notion, Dropbox, Raindrops, ~~ etc.

## Current version of Quanta Quest App

1. Supports users to import Gmail data.

2. Manage documents data with apps.

# How to deploy

This project is a desktop application built with Wails.

## Running Process

- Clone the code to your local machine, then enter the project directory with `cd ./quanta-quest-app`
- Config environment for `go` and `wails`
- Config environment for `node`
- Run the promgrm locally by `wails dev`

## Build

- same process above...
- Run the promgrm locally by `wails build`

## Generate app icon

- Put `appicon.png` image file in `build` folder (if is not existed, need to create it).
- generate for mac

```
# create icon.iconset folder
mkdir appicon.iconset

#  use sips to generate different size images
sips -z 16 16     appicon.png --out appicon.iconset/icon_16x16.png
sips -z 32 32     appicon.png --out appicon.iconset/icon_16x16@2x.png
sips -z 32 32     appicon.png --out appicon.iconset/icon_32x32.png
sips -z 64 64     appicon.png --out appicon.iconset/icon_32x32@2x.png
sips -z 128 128   appicon.png --out appicon.iconset/icon_128x128.png
sips -z 256 256   appicon.png --out appicon.iconset/icon_128x128@2x.png
sips -z 256 256   appicon.png --out appicon.iconset/icon_256x256.png
sips -z 512 512   appicon.png --out appicon.iconset/icon_256x256@2x.png
sips -z 512 512   appicon.png --out appicon.iconset/icon_512x512.png
sips -z 1024 1024 appicon.png --out appicon.iconset/icon_512x512@2x.png

# use iconutil to convert to .icns
iconutil -c icns appicon.iconset
```

# Roadmap

- [x] Gmail
- [ ] Notion
- [ ] Dropbox
- [ ] Raindrops
- [ ] Build gateway server for data management (support data search api for other apps / agents)
- [ ] Connect to Ollama
- [ ] Support vector search within data source scope
- [ ] Support for more data sources

## License

Copyright 2024 Quanta Quest Private Limited

Licensed under the Quanta Quest License; you may not use this file except in compliance with the License.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
