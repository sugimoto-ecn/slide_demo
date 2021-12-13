class Scroll{
    constructor(target){
        this.init(target)

    }
    // 引数　(中身, アニメーション時間)
    slideUp (text, duration = 1000) {
        //先頭の要素の座標と幅、高さを取得
        const clientRect = this.top.getBoundingClientRect() ;
        const x = clientRect.left ;
        const y = clientRect.top ;
        const h = this.top.clientHeight;
        const w = this.top.clientWidth;
        
        //先頭の要素の絶対位置を設定
        this.top.style.top = y + "px"
        this.top.style.left = x + "px"
        this.top.style.width = w + "px"
        this.top.style.height = h + "px"
        
        //スライドさせるためにダミーのタグを作成
        let slider = document.createElement('div');
        slider.style.height = h + "px";

        //先頭を絶対一に設定してダミーの要素を先頭に追加
        this.top.style.position = "absolute"
        this.targetGroup.prepend(slider)
        this.top.classList.add("fadeout")

        //ダミーの要素をスライドさせる
        slider.style.height = slider.offsetHeight + "px";
        slider.offsetHeight;
        slider.style.transitionProperty = "height, margin, padding";
        slider.style.transitionDuration = duration + "ms";
        slider.style.transitionTimingFunction = "ease";
        slider.style.overflow = "hidden";
        slider.style.height = 0;
        slider.style.paddingTop = 0;
        slider.style.paddingBottom = 0;
        slider.style.marginTop = 0;
        slider.style.marginBottom = 0;
        setTimeout(() => {
          slider.style.display = "none";
          slider.style.removeProperty("height");
          slider.style.removeProperty("padding-top");
          slider.style.removeProperty("padding-bottom");
          slider.style.removeProperty("margin-top");
          slider.style.removeProperty("margin-bottom");
          slider.style.removeProperty("overflow");
          slider.style.removeProperty("transition-duration");
          slider.style.removeProperty("transition-property");
          slider.style.removeProperty("transition-timing-function");

          //スライドできたら先頭だった要素とダミーの要素を削除
          slider.remove()
          this.top.remove()
          this.init("target")
        }, duration);

        //引数の値をもとに新しい要素を追加しfadeさせる
        const newEl = document.createElement('li')
          newEl.innerText = text   
          this.targetGroup.appendChild(newEl)
          newEl.animate([{opacity: '0'}, {opacity: '1'}], 1000)
          newEl.classList.add('list-group-item')
      }
    init(target){
        //リストを丸ごと含む親要素
        let targetGroup = document.getElementById(target);
        this.targetGroup = targetGroup;

        //一番先頭の要素
        let top =  Array.from(targetGroup.children)[0]
        this.top = top

        //先頭以外
        let targetList = Array.from(targetGroup.children).slice(1, targetGroup.children.length)
        this.targetList = targetList

        //先頭クリック時に slideUp関数が走る
        top.addEventListener('click', () => {
            this.slideUp(new Date())
            
        })
    
    }

}
