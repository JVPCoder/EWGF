new Vue({
  el: '#app',
  data:{
    running: false,
    jinLife: 100,
    kazuyaLife: 100,
    videosrc: '',
    logs:[]
  },
  computed:{
    hasResult(){
      return this.jinLife == 0 || this.kazuyaLife == 0
    }
  },
  methods:{
    startGame(){
      this.running = true
      this.kazuyaLife = 100
      this.jinLife = 100
      this.logs = []
      this.videosrc = 'medias/intro.mp4'
    },
    attack(especial){
        this.hurt('kazuyaLife',7,12, false, 'Jin', 'Kazuya', 'jin')

        if(especial){
          this.videosrc = 'medias/dorya.mp4'
        }else{
          this.videosrc = 'medias/combo.mp4'
        }

        if(this.jinLife > 0){
          this.hurt('jinLife',5,10, especial, 'Kazuya', 'Jin', 'kazuya')
        }
    },
    hurt(atr,min,max,especial, source, target, cls){
        const plus = especial ? 5 : 0
        const hurt = this.getRandom(min + plus, max + plus)
        this[atr] = Math.max(this[atr] - hurt, 0)
        this.registerLog(`${source} atingiu ${target} com ${hurt}.`, cls)
    },
    heatAndHurt(){
      this.heat(10,15)
      this.hurt('kazuyaLife', 7,12, false, 'Jin', 'Kazuya', 'jin')
      this.videosrc = 'medias/heat.mp4'
    },
    heat(min,max){
      const heat = this.getRandom(min,max)
      this.kazuyaLife = Math.min(this.kazuyaLife + heat, 100)
      this.registerLog(`Kazuya ganhou força de ${heat}.`, 'kazuya')
    },
    getRandom(min,max){
      const value = Math.random() * (max- min) + min
      return Math.round(value)
    },
    registerLog(text, cls){
      this.logs.unshift({text, cls})
    }
  },
  watch:{
    hasResult(value){
      if(value) this.running = false
    }
  }
})
