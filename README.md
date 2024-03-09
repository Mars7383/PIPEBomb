<table style="border: none;">
  <tr>
    <td>
      <img src="https://i.imgur.com/HFkBiki.png" width="100" />
    </td>
    <td>
      <h1>PIPEBomb</h1> 
    </td>
  </tr>
  <tr>
    <td>
      <p>By Mars7383</p>
    </td>
    <td>
      <p>A NexusPIPE captcha solver proof-of-concept from August 7th, 2022.</p> 
    </td>
  </tr>
</table>

<video src="https://github.com/Mars7383/PIPEBomb/assets/72959419/5beb338f-7d83-4fee-8428-7642e582bec2"></video>

<h1>Hm?</h1>
Before NexusPIPE ramped up their security, one of their captchas that they offered as a part of their services was a simple puzzle piece slider. Using <a href="https://github.com/AndriiHeonia/pixfinder">pixfinder</a>, I made a very quick userscript for Tampermonkey that would recognize the puzzle piece shape in the captcha image and move the slider to the appropriate position.
<br><br>
The reason it worked so well was because the noisy puzzle piece cutout was actually using colors that were not in the rest of the image (like pink, cyan, etc). I was not the first person to discover this, and in fact, the user Mxtthew on v3rmillion legacy <a href="https://imgur.com/a/IGAUbVB">utilized it better</a>. This script stopped working after NexusPIPE updated their captcha to make the entire image noisy.
<br><br>
<hr><br>
Not affiliated with or endorsed by Nexus Networks LTD. For educational purposes only, no copyright infringement intended.
