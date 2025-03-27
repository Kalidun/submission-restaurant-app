const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const target = path.resolve(__dirname, "src/public/images/heros");
const destination = path.resolve(__dirname, "dist/images/heros");

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

const sizes = [
  { width: 800, suffix: "large" },
  { width: 480, suffix: "small" },
];

fs.readdirSync(target).forEach((image) => {
  if (!image.match(/\.(jpg|jpeg|png)$/i)) return;

  sizes.forEach(({ width, suffix }) => {
    sharp(`${target}/${image}`)
      .resize(width)
      .toFile(
        path.resolve(
          destination,
          `${image.split(".").slice(0, -1).join(".")}-${suffix}.jpg`
        )
      )
      .then(() => console.log(`${image} resized to ${suffix}`))
      .catch((err) => console.error(`Error processing ${image}:`, err));
  });
});
