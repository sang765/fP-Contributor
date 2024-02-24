<!-- HEAD PAGE -->
<div align="center">
  <img src="https://cdn.discordapp.com/icons/1117373291095662623/cd7c44850a9a6e06b586abe05e035c7d.webp?size=1024&format=webp" alt="Server Discord Icon" width="100">
  <h1><strong>fakeProfile</strong></h1>
  An <a href="https://vencord.dev/"><strong>all-in-one Vencord</strong></a> plugin to customize your Discord profile
</div>

<!-- MARKDOWN BADGED -->

<p align="center">
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <img src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white" alt="CSS"></a>
  <a href="https://discord.gg/ffmkewQ4R7"><img src="https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white" alt="Discord Server"></a>
</p>
<p align="center">
<a href="https://vencord.dev"><img src="https://img.shields.io/badge/This%20plugin%20for-Vencord-pink?labelColor=gray&style=flat&logo=https://lh3.googleusercontent.com/zDATisIeInAwNSjH9LgItgvGXwq3M4SDdoIZzctMZ3Hbl9IhoFVJtsHvzQPz_a7K5xbdURropceVQK6XGrmg4v4HSQ=s60&link=https://vencord.dev" alt="Vencord Baged" /></a>
</p>

___

<!-- BODY -->

## 🖥️Selection

 - [fakeProfile](#fakeprofile)
   - [❓What is fakeProfile?](#what-is-fakeprofile)
   - [🔨Installation](#installation)
   - [❓Tutorial about plugin](#tutorial-about-plugin)
   - [❔QnA](#qna)



## ❓What is fakeProfile?
<div align="center">
  <img src="https://cdn.discordapp.com/attachments/998071689009184870/1209377838571061298/bg.png?ex=65e6b3e1&is=65d43ee1&hm=d1e5af92057e9050ba3d2104b13315ee683931a43cd29aaa57695ae697ad41f2&" alt="Preview" width= "500">
</div>

**fakeProfile** is a plugin for **Vencord** that supports all features related to nitro profile editing `without` the need to use individual plugins to create a complete profile with features such as:
 - Custom banner (Animated)
 - Custom avatar (Animated)
 - Choose custom badges
 - Choose profile effect (Without Nitro)
 - Choose profile theme colors (Without Nitro)
 - Choose custom decoration (Coming Soon...)
 - Reload database without restart client (This plugin used `/reload` to reload database)



## 🔨Installation
 ### 1. Requirement
 - The version you are using is **Vencord DEV Build**. If you don't know how to install then you can [click here](https://github.com/Vendicated/Vencord/blob/main/docs/1_INSTALLING.md) to read the installation instructions.

- Youtube video install Vencord DEV Build by [@daveyy1](https://discordappuser.com/users/549244932213309442): *Click image below to watch tutorial*

 [![Tutorial Install Third Party Plugin](https://img.youtube.com/vi/8wexjSo8fNw/maxresdefault.jpg)](https://www.youtube.com/watch?v=8wexjSo8fNw)

 ### 2. Install Plugin
 Open **Windows Explorer** and select the path where you installed **Vencord** and click on the `src` folder. In the folder you just clicked, create a new folder named `userplugins` *(in case you already have that folder, you can skip creating the `userplugins` folder)*.

 - In the `userplugins` folder click on the address bar and type **cmd** and press **enter**.

 In **Command Prompt** used this command:
 ```shell
 git clone https://github.com/sampathgujarathi/fakeProfile.git
 ```

 After typing the command line, wait until the download is completed and then type:
 ```shell
 pnpm build
 ```
 And that all. Now you can restart Discord and check **fakeProfile** in **Plugins** setting.

 ### 3. How to update fakeProfile plugin?
 - Goto `Vencord\src\userplugins\fakeProfile` in adress bar type **cmd** and click to **Command Prompt** type:
 ```shell
 git pull
 ```
 - Then type:
 ```shell
 pnpm build
 ```
 That all. Restart your Discord client and enjoy.



## ❓Tutorial about plugin
> ✏️ **Note:** You must join our Discord server to request banners, avatars and badges. You can [click here](https://discord.gg/ffmkewQ4R7) and it will take you straight to our Discord server.

 ### 1. How to request banner?
 - Goto [#vencord-commands](https://discord.com/channels/1117373291095662623/1185970757105360927)
 - Used `/profile banner upload` command like image below:
 
 <img src="https://cdn.discordapp.com/attachments/998071689009184870/1210884226312966205/image.png?ex=65ec2ed0&is=65d9b9d0&hm=1e65108263618d2754e0c1843dffe6abd0c90798d92d9f23ce3acdef2dcf9dc8&" alt="profile banner upload">

 - All that's left for you is to wait until your request is approved in the [#fakeprofile-log](https://discord.com/channels/1117373291095662623/1209032677366431815) and use the `/reload` command to reload the database and enjoy.

 ### 2. How to request avatar?
 - Goto [#vencord-commands](https://discord.com/channels/1117373291095662623/1185970757105360927)
 - Used `/profile avatar upload` command like image below:

 <img src="https://cdn.discordapp.com/attachments/998071689009184870/1210885978445586452/image.png?ex=65ec3072&is=65d9bb72&hm=e2b9b7f554e35eb793ee67e07c4f0a0c31608d099a58dd3223fa40653879bfba&" alt="profile avatar upload">

 - All that's left for you is to wait until your request is approved in the [#fakeprofile-log](https://discord.com/channels/1117373291095662623/1209032677366431815) and use the `/reload` command to reload the database and enjoy.
 
 ### 3. How to choose a profile effect?
 - Goto [#vencord-commands](https://discord.com/channels/1117373291095662623/1185970757105360927)
 - Used command `/profile effects` like this:

  <img src="https://cdn.discordapp.com/attachments/998071689009184870/1210889022189346866/image.png?ex=65ec3348&is=65d9be48&hm=c84443ed081bf133df62ee21f7ab0537c50a2c0dd0205837280d06945df6fa42&" alt="profile effects">

 - Choose a effect and click **`Apply`** button

  <img src="https://cdn.discordapp.com/attachments/998071689009184870/1210888342414303262/image.png?ex=65ec32a6&is=65d9bda6&hm=cfbbb49d58370e04ce4488b6baa1e3d24842d6113a100df1649c15d01d05ed05&" alt="profile effects preview">
 
 - After that used `/reload` to reload database and enjoy.

 ### 4. How to request badge?
 - Goto [#vencord-commands](https://discord.com/channels/1117373291095662623/1185970757105360927)
 - Used command `/badges add` like this:
 
 <img src="https://cdn.discordapp.com/attachments/998071689009184870/1210892420741333103/image.png?ex=65ec3672&is=65d9c172&hm=f0f5f4e918ff1e4ce682a7fc0059ecf4b5f2d1d79b9806989748b33379744889&" alt="/badges add command">

 - Wait your request approved in [#badge-log](https://discord.com/channels/1117373291095662623/1198555327730294844) and use `/reload` command to reload database and enjoy.

 ### 5. How to manager and remove my badges?
 - Goto [#vencord-commands](https://discord.com/channels/1117373291095662623/1185970757105360927)
 - Used `/badges view` like this image:

 <img src="https://cdn.discordapp.com/attachments/998071689009184870/1210893128538791986/image.png?ex=65ec371b&is=65d9c21b&hm=f1bcc825b2027334ff28aac7ea0e874fff0b1227c420fbed0c85444304912da7&" alt="badges view commands">

 - You can manager or remove badged with command

 <img src="https://cdn.discordapp.com/attachments/998071689009184870/1210893128744308776/image.png?ex=65ec371b&is=65d9c21b&hm=9ba0a687fb29838530b01f3408b56b2c884cff17344afea760f212d5c7bba5c0&" alt="bageds manager">

 - Used `/reload` to reload database and done.



## ❔QnA
 ### 1. Can everyone in Discord see my profile?
 - No, everyone in Discord will not see about your Profile change but in case if they also use the fakeProfile plugin then they will see your change.
 ### 2. If I leave the Discord server, will everything on my profile be lost?
 - No, because your requests will be saved in the plugin's database, so if you leave the server, everything will not be affected. *(unless you turn off the fakeProfile plugin, everything will return to the way it was when you didn't use this plugin)*
 ### 3. So what happens if I disable fakeProfile plugin?
 - As I answered in the 2nd QnA, everything will return to the way it was before you used this plugin. Of course, you can still turn it back on if you want to use it, but if you don't want to use it anymore, you have the right to turn this plugin off.

<!-- END -->

---
<p align="center" style="color: gray;">
  @2023-2024 fakeProfile
</p>
