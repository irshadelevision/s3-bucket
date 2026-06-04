# S3 Bucket File Upload Example

A small Express.js example app that uploads files to S3-compatible object storage.

It demonstrates two upload approaches using:
- `skipper-s3`
- `skipper-better-s3`

The app can be used with providers such as:
- AWS S3
- Linode Object Storage
- DigitalOcean Spaces
- other S3-compatible services

## Features

- Upload files from a simple HTML form
- Two separate upload methods for comparison
- Environment-based configuration
- Works with S3-compatible endpoints

## Tech Stack

- Node.js
- Express
- EJS
- Skipper
- `skipper-s3`
- `skipper-better-s3`

## Project Structure

```text
.
├── app.js
├── .env_sample
├── package.json
└── views/
    └── index.ejs
```

## Setup

1. Clone the repository.
2. Install dependencies:

```bash
yarn install
```

Or with npm:

```bash
npm install
```

3. Copy the sample environment file:

```bash
cp .env_sample .env
```

4. Update `.env` with your object storage credentials.

## Environment Variables

This project expects the following variables:

- `S3_KEY`
- `S3_SECRET`
- `S3_BUCKET`
- `S3_ENDPOINT`

Example:

```env
S3_KEY=your-access-key
S3_SECRET=your-secret-key
S3_BUCKET=your-bucket-name
S3_ENDPOINT=https://your-s3-compatible-endpoint
```

## Running the App

Start the server with:

```bash
node app.js
```

The server runs on:

```text
http://localhost:3000
```

## Available Routes

### Method 1

- `GET /method1` — renders an upload form
- `POST /method1` — uploads a file using `skipper-s3`

### Method 2

- `GET /method2` — renders an upload form
- `POST /method2` — uploads a file using `skipper-better-s3`

## Upload Form

Both routes render the same simple form from `views/index.ejs` with a file input named `avatar`.

## Notes

- The app listens on port `3000`.
- In `method1`, the upload uses a configured `receive()` stream.
- In `method2`, upload options are passed directly into `req.file('avatar').upload(...)`.
- `method2` sets uploaded file ACL to `public-read`.

## License

MIT
