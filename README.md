<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .copy-button {
            cursor: pointer;
            background-color: #4CAF50;
            color: white;
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
        }
    </style>
</head>
<body>

<script>
    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
</script>

# Effecto

## Hydro Blast
**Id:** `󠀱󠀱󠀳󠀹󠀳󠀲󠀳󠀰󠀷󠀵󠀵󠀱󠀹󠀸󠀵󠀲󠀶󠀲󠀵` <button class="copy-button" onclick="copyToClipboard('󠀱󠀱󠀳󠀹󠀳󠀲󠀳󠀰󠀷󠀵󠀵󠀱󠀹󠀸󠀵󠀲󠀶󠀲󠀵')">Copy</button>
**Image:** ![Hydro Blast Thumbnail](https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/splash/thumbnail.png)

## Shatter
**Id:** `󠀱󠀱󠀳󠀹󠀳󠀲󠀳󠀰󠀹󠀳󠀱󠀱󠀴󠀹󠀶󠀲󠀰󠀲󠀱` <button class="copy-button" onclick="copyToClipboard('󠀱󠀱󠀳󠀹󠀳󠀲󠀳󠀰󠀹󠀳󠀱󠀱󠀴󠀹󠀶󠀲󠀰󠀲󠀱')">Copy</button>
**Image:** ![Shatter Thumbnail](https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/earthquake/thumbnail.png)

## Magic Hearts
**Id:** `󠀱󠀱󠀳󠀹󠀳󠀲󠀳󠀱󠀰󠀰󠀱󠀲󠀷󠀸󠀳󠀴󠀲󠀲󠀳` <button class="copy-button" onclick="copyToClipboard('󠀱󠀱󠀳󠀹󠀳󠀲󠀳󠀱󠀰󠀰󠀱󠀲󠀷󠀸󠀳󠀴󠀲󠀲󠀳')">Copy</button>
**Image:** ![Magic Hearts Thumbnail](https://cdn.discordapp.com/assets/profile_effects/effects/b17d139f2e9/magic-girl/thumbnail.png)

<!-- Repeat the above pattern for other effects -->

</body>
</html>
