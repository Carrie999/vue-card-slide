`<template>
  <div class="wrap">
    <!-- <div class="bg" :style="backgroundDiv" id='bg'> -->
    <div class="bg" id='bg'>
      <v-touch v-on:swipeleft="onSwipeLeft" v-on:swiperight="onSwipeRight">
        <div class="content" >      
          <transition :name="direction">
            <div class="contentItem" v-show="show" ref='contentItem' id='box'>
               <img class='item':src="img[0]" alt="" >
            </div>
          </transition>
          <transition :name="direction">
            <div class="contentItem middle2 " v-show="show2" ref='contentItem2' id='box2'>
               <img class='item' :src="img[1]" alt="" >
            </div>
          </transition>
          <transition :name="direction">
            <div class="contentItem bottom3" v-show="show3" ref='contentItem3' id='box3'>
             <img class='item':src="img[2]" alt="" >
            </div>
          </transition>
        </div>
        <!-- <div class='judge'>
          <div class="circle cirMargin" @click="success()"><span>对</span></div>
          <div class="circle" @click="error()"><span>错</span></div>
        </div> -->
       </v-touch>
    </div>  
  </div>
</template>

<script>
(function(win,doc){
    function change(){
        doc.documentElement.style.fontSize = doc.documentElement.clientWidth*20/375+'px';
    }
    change();
    win.onresize = change;
})(window,document);
  export default {
    name: 'vue-card-slide',
    data() {
      return {
        show:true,
        show2:true, 
        show3:true, 
        showFeedBack:false,
        showAfter:false,
        num:0,
        direct:0,
        flag:'on',
        times:0,
        // backgroundDiv: {
        //   backgroundImage: 'url(' + require('../assets/bg_mission_whole@3x.png') + ')',
        // },
        showFeedBackFlag:0,
        img: [require('../assets/1.jpg'),require('../assets/2.jpg'),require('../assets/3.jpg')],

      }
    },
    props: {
      width: {
        type: String,
        required: false
      },
      height:  {
        type: String,
        required:false
      }
    },
    computed: {
      direction () {
        if(this.direct==0){
          return 'slide-fade2'
        }else {
          return 'slide-fade1'
        }
      }
    },
    mounted(){
      console.log(this.width)
        touch('box');
        touch('box2');
        touch('box3');
        let _this = this;
        function touch(id){
            var obj = document.getElementById(id); 
            // console.log(obj)
            obj.addEventListener('touchstart', function(event) { 
            // 如果这个元素的位置内只有一个手指的话 
            if (event.targetTouches.length == 1) { 
            var touch = event.targetTouches[0]; 
            // 把元素放在手指所在的位置 
            var disX=touch.pageX-obj.offsetLeft; 
            var disY=touch.pageY-obj.offsetTop;

            obj.addEventListener('touchmove',move);  
            function move(event){    
                //event.preventDefault();
                document.documentElement.style.touchAction = 'none';
                    var touch2=event.targetTouches[0];
                    var l=touch2.pageX-disX;
                    var t=touch2.pageY-disY;
                    // if(l<0){
                    //     l=0;
                    // };
                    // if(l>document.documentElement.clientWidth-obj.offsetWidth){
                    //     l=document.documentElement.clientWidth-obj.offsetWidth
                    // };
                    // if(t<0){
                    //     t=0;
                    // };
                    // if(t>document.documentElement.clientHeight-obj.offsetHeight){
                    //     t=document.documentElement.clientHeight-obj.offsetHeight;
                    // };
                    // console.log(t)
                    obj.style.left=l+'px';
                    obj.style.top=t+'px';
         
            };
              obj.addEventListener('touchend',chend);
              function chend(event){
                if(obj.offsetLeft<0){
                  _this.success(0);
                }else if(obj.offsetLeft>0){
                  _this.success(1);
                }else {
                  if(obj.offsetTop!==0){
                    _this.success(0);
                  }
                }
                
                document.documentElement.style.touchAction = 'auto';
                obj.removeEventListener('touchmove',move);
                obj.removeEventListener('touchend',chend);
              };
        }; 
        }, false);
      };
    },
    methods:{
      success(numb){
        if(this.flag== 'off'){
          return;
        }
        if(numb==1){
          this.direct=1;
          this.label_result=0;
          this.$emit('error','right-swipe');
        }else {
          this.$emit('success','left-swipe');
          this.direct=0;
          this.label_result=1;
        }
        if(this.flag=='on'){
     
        }
        this.flag='off'
        this.num +=1;
        // 第一个动效
        if(this.num%3==1){
          // 第一个隐藏
            this.show=false;
          // 第二个 第三个变大上移
          setTimeout(()=>{
            this.$refs.contentItem2.style.transform='scale(1)';
            this.$refs.contentItem2.style.zIndex =16;
            this.$refs.contentItem3.style.transform='scale(0.98)';
            this.$refs.contentItem3.style.zIndex =10;
            var bb=0.18
            for(var i=0; i<200;i++){
              setTimeout(()=>{
                bb = bb-0.001
                this.$refs.contentItem2.style.top=`${bb}rem`;
                // console.log(`${bb}rem`)
              },i);
            }
            var cc=0.38
            for(var i=0; i<200;i++){
              setTimeout(()=>{
                cc=cc-0.001
                this.$refs.contentItem3.style.top=`${cc}rem`;
              },i);
            }
            //显示
            this.$refs.contentItem.style.top='0.38rem';
            this.$refs.contentItem.style.left='0rem';
            this.$refs.contentItem.style.transform='scale(0.96)';
            this.$refs.contentItem.style.zIndex =5;
            this.show = true;
            // this.$refs.contentItem3.style.top='-0.45rem';
           this.flag='on'
            // this.showAfter=true;
          },400);
        }
         // 第二个动效
        if(this.num%3==2){
            this.show2=false;
           // 第二个变大上移
            setTimeout(()=>{
              this.$refs.contentItem3.style.transform='scale(1)';
              this.$refs.contentItem3.style.zIndex =15;
              var bb=0.18
              for(var i=0; i<200;i++){
                setTimeout(()=>{
                  bb = bb-0.001
                  this.$refs.contentItem3.style.top=`${bb}rem`;
                  // console.log(`${bb}rem`)
                },i);

              //第三个到第二个
              this.$refs.contentItem.style.transform='scale(0.98)';
              this.$refs.contentItem.style.zIndex =10;
              this.$refs.contentItem.style.top='0.18rem';
              // var cc=0.38
              // for(var i=0; i<200;i++){
              //   setTimeout(()=>{
              //     cc=cc-0.001
              //     this.$refs.contentItem.style.top=`${cc}rem`;
              //   },i);
              // }
              

              //追加第三个
              this.$refs.contentItem2.style.top='0.38rem';
              this.$refs.contentItem2.style.left='0rem';
              this.$refs.contentItem2.style.transform='scale(0.96)';
              this.$refs.contentItem2.style.zIndex =5;
              this.show2 = true;
              this.flag='on'

              }
              },400);
        }
        if(this.num%3==0){
            this.show3=false;
            // 第二个变大上移
            setTimeout(()=>{
              this.$refs.contentItem.style.transform='scale(1)';
              this.$refs.contentItem.style.zIndex =15;
              var bb=0.18
              for(var i=0; i<200;i++){
                setTimeout(()=>{
                  bb = bb-0.001
                  this.$refs.contentItem.style.top=`${bb}rem`;
                  // console.log(`${bb}rem`)
                },i);

              //第三个到第二个
              this.$refs.contentItem2.style.transform='scale(0.98)';
              this.$refs.contentItem2.style.zIndex =10;
              this.$refs.contentItem2.style.top='0.18rem';
              // var cc=0.38
              // for(var i=0; i<200;i++){
              //   setTimeout(()=>{
              //     cc=cc-0.001
              //     this.$refs.contentItem.style.top=`${cc}rem`;
              //   },i);
              // }
              

              //追加第三个
              this.$refs.contentItem3.style.top='0.38rem';
              this.$refs.contentItem3.style.left='0rem';
              this.$refs.contentItem3.style.transform='scale(0.96)';
              this.$refs.contentItem3.style.zIndex =5;
              this.show3 = true;
              this.flag='on'

              }
            },400);
          }
      },
      error(){
        this.direct=1;
        this.success(1);
      },
      onSwipeLeft(){
        this.success();
      },
      onSwipeRight(){
        this.error();
      },
    }
}
</script>
<style scoped lang="scss">
.wrap{
  // font-size:0.8rem;
  // overflow: hidden; 
  // height:100%;
  .bg{
    margin: 0 auto;
    // height:100%;
    // overflow: hidden; 
    // padding-top:0.2rem;
    // padding-left:1rem;
    // padding-right:1rem;
    // color:#fff;
    // height:100%;
    // background:#f1f1f1; 
    // background-size: cover;
    .content{
      margin: 0 auto;
      position:relative;
      height:14.5rem;
      // margin-top:3.2rem;
      // margin-bottom:1.4rem;
    }
    .contentItem{
      -webkit-transform: translateZ(0);
         -moz-transform: translateZ(0);
          -ms-transform: translateZ(0);
           -o-transform: translateZ(0);
              transform: translateZ(0);
      -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
         -ms-backface-visibility: hidden;
             backface-visibility: hidden;
      -webkit-perspective: 1000;
        -moz-perspective: 1000;
         -ms-perspective: 1000;
             perspective: 1000;
      -webkit-transform: translate3d(0, 0, 0);
         -moz-transform: translate3d(0, 0, 0);
          -ms-transform: translate3d(0, 0, 0);
              transform: translate3d(0, 0, 0);
      box-shadow:0px 1px 5px gray;
      position:absolute;
      z-index:15;
      box-sizing: border-box;
      width:16.75rem;
      height:14.5rem;
      background:#fff;
      border-radius:0.25rem;
      // padding:0.5rem;
      transform-origin:50% 100%;
      overflow: hidden;
      .item{
        margin: 0.5rem;
        box-sizing: border-box;
        width:15.75rem;
        height:13.5rem;
        background-size:cover; 
      }
    }
    .middle2{
      z-index:10;
      top:0.18rem;
      transform:scale(.98);
    }
    .bottom3{
      z-index:5;
      top:0.38rem;
      transform:scale(.96);
    }
    .contentItem2{
      box-shadow:0px 1px 3px gray;
      transform:scale(0.98);
      position:absolute;
      top:-0.45rem;
      z-index:5;
      transform-origin:50% 100%;
      box-sizing: border-box;
      margin-top:0.65rem;
      margin-bottom:1.4rem;
      width:16.75rem;
      background:#fff;
      height:14.5rem;
      border-radius:0.25rem;
      padding:0.5rem;
      .item2{
      position:absolute;
      width:15.75rem;
      height:13.5rem;
      background-size:cover;
      }
    }
    .contentItem3{
      transform:scale(0.96);
      position:absolute;
      top:-0.25rem;
      z-index:0;
      transform-origin:50% 100%;
      box-sizing: border-box;
      margin-top:0.65rem;
      margin-bottom:1.4rem;
      width:16.75rem;
      background:#fff;
      height:14.5rem;
      border-radius:0.25rem;
      padding:0.5rem;
      .item3{
        position:absolute;
      width:15.75rem;
      height:13.5rem;
      background-size:cover;
      }
    }
    .judge{
      margin-top:3rem;
      margin-bottom:2rem;
      // margin-bottom:2.75rem;
      display:flex;
      justify-content:center;
      .circle{
        display:inline-block;
        index:1;
        background:#fff;
        height:3rem;
        width:3rem;
        border-radius:100%;
        span{
          color: #1d3949;
          font-size:1rem;
          line-height: 3rem;
        }
      }
      .cirMargin{
        margin-right:2.9rem;
      }
    }
  }
}
 @keyframes swipe{
      0%{
        transform: translateX(10px) rotate(0);
        
      }
      100%{
        transform: translateX(-18.75rem) rotate(-90deg);
      }
} 
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
}
.slide-fade-leave-active {
  transition:all 2.2s ease-out; 
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(-18.75rem) rotate(-90deg);
  opacity: 0;
}

// .slide-fade1-leave-active {
//   animation-name: fold-out1;
//   animation-duration: 1.5s;
//   animation-timing-function: ease-out;

// }
.slide-fade1-leave-active {
  animation-name: fold-out1;
  animation-duration: 0.7s;
  animation-timing-function: cubic-bezier(.55,.55,.55,.55);

}
.slide-fade2-leave-active {
  animation-name: fold-out;
  animation-duration: 0.7s;
  animation-timing-function: cubic-bezier(.55,.55,.55,.55);

}

@keyframes fold-out {
  0% {
    transform: translateX(0rem)
  }
  100% {
    transform: translateX(-18.75rem);
  }
}

// @keyframes fold-out {
//   0% {
//     transform: translateX(0rem)
//   }
//   100% {
//     transform: translateX(-18.75rem) rotate(-90deg);
//   }
// }
@keyframes fold-out1 {
  0% {
    transform: translateX(0rem)
  }
  100% {
    transform: translateX(18.75rem);
  }
}
// @keyframes fold-out1 {
//   0% {
//     transform: translateX(0rem)
//   }
//   100% {
//     transform: translateX(18.75rem) rotate(90deg);
//   }
// }



.show2{
  width:100px;
  height:100px;
  position:absolute;
  z-index:10;
  background:red;
  transform-origin:0% 50%; 
}
.show3{
  width:100px;
  height:100px;
  position:absolute;
  z-index:5;
  background:red;
  transform-origin:0% 50%; 
}
</style>
