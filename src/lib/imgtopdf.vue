<template>
  <div></div>
</template>
<script>
import "./pdf";
import "./vfs_fonts";

export default {
  name: "imgtopdf",
  data() {
    return {
      completenum: 0,
      totalnum: 0,
      imgdata: new Array(),
      emptyobj: new Object()
    };
  },
  methods: {
    oncomplete() {},
    getDataURL(url, index) {},
    ImageDataURL(urls) {
      this.completenum = 0;
      this.totalnum = 0;
      this.imgdata = new Array();
      this.emptyobj = new Object();
      this.oncomplete = function() {};
      this.getDataURL = function(url, index) {
        var c = document.createElement("canvas");
        var cxt = c.getContext("2d");
        var img = new Image();
        var dataurl;
        var p;
        p = this;
        img.src = url;
        img.onload = function() {
          var i;
          var maxwidth = 500;
          var scale = 1.0;
          if (img.width > maxwidth) {
            scale = maxwidth / img.width;
            c.width = maxwidth;
            c.height = Math.floor(img.height * scale);
          } else {
            c.width = img.width;
            c.height = img.height;
          }
          cxt.drawImage(img, 0, 0, c.width, c.height);

          p.imgdata[index] = c.toDataURL("image/jpeg");
          for (i = 0; i < p.totalnum; ++i) {
            if (p.imgdata[i] == null) break;
          }
          if (i == p.totalnum) {
            p.oncomplete();
          }
        };
        img.onerror = function() {
          p.imgdata[index] = p.emptyobj;
          let i = null;
          for (i = 0; i < p.totalnum; ++i) {
            if (p.imgdata[i] == null) break;
          }
          if (i == p.totalnum) {
            p.oncomplete();
          }
        };
      };
      if (urls instanceof Array) {
        this.totalnum = urls.length;
        this.imgdata = new Array(this.totalnum);
        for (let key in urls) {
          this.getDataURL(urls[key], key);
        }
      } else {
        this.imgdata = new Array(1);
        this.totalnum = 1;
        this.getDataURL(urls, 0);
      }
      return this;
    },
    down(urlArr) {
      var x = this.ImageDataURL(urlArr);
      x.oncomplete = function() {
        var imgs = new Array();
        console.log("complete");
        for (let key in this.imgdata) {
          if (this.imgdata[key] == this.emptyobj)
            //不存在的图片直接忽略
            continue;
          imgs.push({ image: this.imgdata[key] }); //pdfmake的图片格式{image:image dataurl}
        }
        var dd = {
          content: ["图片预览", imgs],
        //   defaultStyle: {
        //     font: "微软雅黑"
        //   }
        };
        // pdfMake.fonts = {
        //   微软雅黑: {
        //     normal: "微软雅黑.ttf",
        //     bold: "微软雅黑.ttf",
        //     italics: "微软雅黑.ttf",
        //     bolditalics: "微软雅黑.ttf"
        //   }
        // };
        pdfMake.createPdf(dd).download();
      };
    }
  }
};
</script>
<style scoped>

</style>
