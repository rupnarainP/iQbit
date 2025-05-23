<img src="https://github.com/ntoporcov/iQbit/raw/master/src/images/logo_round.png" alt="iQbit logo" title="iQbit Logo" align="right" height="300" />

# iQbit

iQbit is an iOS-styled WebUI theme and standalone web application for qBitTorrent clients, designed with a focus on ease of use and a mobile-first experience.

True story. While I was developing this, my wife asked me if qBitTorrent was like Limewire. The reason was clear, torrent clients haven't evolved in their last 20 years of popularity. iQbit is an attempt to bring torrenting to more modern design approaches. With that being said, this is not a data-heavy approach to torrenting (or at least not yet). The main focus of this project are the following points:

*   Ease of Use
*   Mobile Friendly/First
*   Adhering to Human Interface Guidelines (as much as possible)

This is a PWA! This means you can install this app on your device through your OS default browser. Being a PWA allows us to have native features in the WebUI. Including:

*   Native PushAPI Notifications (hopefully) - Coming whenever apple releases it for iOS 16, expected 2023. Users that enable it could get notifications when a torrent finishes downloading
*   Camera support (maybe) - My idea is to use iOS live text feature to add a torrent by just pointing your phone into its hash id

![Screenshot](public/images/devices-pichi.png)
![Screenshot](public/images/iphones-pichi.png)

## Features

*   **Modern, Mobile-First Interface:** iOS-inspired design for a clean and intuitive user experience.
*   **Progressive Web App (PWA):** Installable on your device for a native-like feel.
*   **qBittorrent Integration:** Full WebUI replacement or standalone operation.
*   **Torrent Management:** View, add, pause, resume, and delete torrents.
*   **Detailed Torrent Info:** Access to files, trackers, peers, and download/upload speeds.
*   **Search Functionality:** Integrated search with support for popular torrent sites (e.g., Rarbg, TPB, YTS via plugins).
*   **TMDB Integration:** Fetches movie and TV show information for your torrents.
*   **Swarm Visualizer:** Graphical representation of torrent swarm activity.
*   **Customizable Settings:** Configure connection, downloads, speed limits, and WebUI options.
*   **Docker Support:** Easy deployment with Docker and Docker Compose.

## Tech Stack

*   **Frontend:** React, TypeScript, Chakra UI
*   **Standalone Server:** Node.js, Express
*   **Build Tools:** React Scripts, Webpack
*   **Package Management:** Yarn (recommended for development)
*   **Containerization:** Docker

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

*   **Git:** For cloning the repository.
*   **Node.js:** (v14 or later recommended). Download from [nodejs.org](https://nodejs.org/).
*   **Yarn:** (Recommended package manager). Install via npm: `npm install --global yarn`.
*   **qBittorrent:** Required if you intend to use iQbit as a WebUI theme or connect to a qBittorrent instance.

### Installation and Running

There are several ways to install and run iQbit:

**1. As a qBittorrent WebUI Theme (Recommended for ease of use)**

This method uses the pre-built files in the `release` directory to replace the default qBittorrent WebUI.

*   Clone the repository:
    ```bash
    git clone https://github.com/ntoporcov/iQbit.git
    ```
*   Navigate to the directory where you cloned the project:
    ```bash
    cd iQbit
    ```
*   In qBittorrent:
    *   Go to `Tools -> Options -> Web UI`.
    *   Enable `Use alternative Web UI`.
    *   Set the `Files location` to the `release` folder within your cloned `iQbit` directory (e.g., `/path/to/iQbit/release`).
    *   Save settings. qBittorrent will now use iQbit as its WebUI.

To get updates, simply pull the latest changes from the repository:
```bash
cd /path/to/iQbit
git pull
```

**2. Running the Frontend (Development Mode)**

This is useful if you want to contribute to development or run the latest unreleased code.

*   Clone the repository (if you haven't already):
    ```bash
    git clone https://github.com/ntoporcov/iQbit.git
    cd iQbit
    ```
*   Install dependencies:
    ```bash
    yarn install
    ```
*   Start the development server:
    ```bash
    yarn start
    ```
    This will typically open iQbit in your web browser at `http://localhost:3000`. The application will connect to the qBittorrent instance configured in its settings (or through the standalone server if used).

**3. Building and Serving the Frontend (Standalone)**

You can build the static files for the frontend and serve them with your own HTTP server.

*   Clone the repository and install dependencies as shown in method 2.
*   Build the application:
    ```bash
    yarn build
    ```
    The static files will be generated in the `build` directory.
*   Deploy the contents of the `build` directory to any static file hosting service or serve it with a local server like `serve`:
    ```bash
    npm install --global serve
    serve -s build
    ```

**4. Using the Standalone Server**

iQbit includes a standalone Node.js server that acts as a proxy to your qBittorrent client. This is useful for accessing iQbit on a different port or managing CORS and API interactions.

*   The standalone server is typically run in conjunction with the frontend.
*   For detailed setup and running instructions, please refer to the [Standalone Server Documentation](server/README.md).

**5. Docker Deployment (Client + Server)**

The easiest way to deploy iQbit with its standalone server is using Docker. This method packages the client and server together.

*   Ensure Docker and Docker Compose are installed.
*   Clone the repository:
    ```bash
    git clone https://github.com/ntoporcov/iQbit.git
    cd iQbit
    ```
*   (Optional) Configure `QBIT_HOST` and `STANDALONE_SERVER_PORT` environment variables in the `docker-compose.yml` file if they differ from the defaults (`http://localhost:8080` and `8081` respectively).
*   Build and run the container using Docker Compose:
    ```bash
    docker-compose up -d
    ```
    Or, build and run using Docker directly:
    ```bash
    docker build -t iqbit .
    docker run -dp 8081:8081 -e QBIT_HOST=http://your-qbittorrent-ip:port -t iqbit
    ```
*   Access iQbit at `http://localhost:8081` (or your server's IP and configured port).

## Releases

All releases will be published right in this repo. For the theme method, pulling the latest code (as described above) is the way to update. For Docker, you may need to pull the latest image if it's published to a registry in the future, or rebuild your local image after pulling the Git repository.

## Standalone Server (Further Details)

This project ships with a standalone server for the WebUI. It means you can run this WebUI all by itself and have it
communicate with your qbittorrent through a proxy. Cool right?

**This is useful if you want to have this WebUI running in a port being used for mobile devices, and keep the default
WebUI in its different port for desktop clients.**

Detailed documentation for the standalone server can be found here: [Standalone Server Documentation](server/README.md)

## RoadMap

I intend to keep supporting this project for the foreseeable future at least until I run out of things that I would like
to see in it. My current feature roadmap organized by priority is the following:

1.  Add support for Sonarr and Radarr

## Settings

I added what I think is a decent amount of all the settings onto the WebUI. Qbittorrent has a ton of settings, so if you
really want to use the webui and the only thing stopping you is one of the missing settings screen, let me know and I'll
do my best to add it in a timely manner.

## License

iQbit is licensed under the terms of the GNU GPLv3 and is available for free. See the [LICENSE](LICENSE) file for more details.

## Bugs & Feature Suggestions (Contributing)

Please use the [Issues tab](https://github.com/ntoporcov/iQbit/issues) for any bugs found and feature suggestions.

If you'd like to contribute code:
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.
