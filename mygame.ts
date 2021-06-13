namespace SpriteKind {
    export const p1atk = SpriteKind.create()
    export const p2atk = SpriteKind.create()
    export const p1body = SpriteKind.create()
    export const p2body = SpriteKind.create()
}
namespace myGame{
    export let g = 200
    export enum PlayerKind{
        //% block="1"
        Player1,
        //% block="2"
        Player2
    }
    export enum SkillKind{
        //% block="A"
        A,
        //% block="⬇️+A"
        A1,
        //% block="↑+A"
        A2,
        //% block="⬇️+↑+A"
        A3,
        //% block="→→+A"
        A4,
        //% block="→→+↑+A"
        A6,
        //% block="➡️+A"
        A8,
        //% block="⬇️+➡️+A"
        A9,
        //% block="⬇️+→+A"
        A10,
        //% block="B"
        B,
        //% block="⬇️+B"
        B1,
        //% block="↑+B"
        B2,
        //% block="⬇️+↑+B"
        B3,
        //% block="→→+B"
        B4,
        //% block="→→+↑+B"
        B6,
        //% block="➡️+B"
        B8,
        //% block="⬇️+➡️+B"
        B9,
        //% block="⬇️+→+B"
        B10,
    }

    export enum atkKind{
        //% block="击拳1"
        BasicAtkA,
        //% block="击拳2"
        RushAtkA,
        //% block="踢腿1"
        BasicAtkB,
        //% block="踢腿2"
        RushAtkB
    }

    export enum stimgKind{
        //% block="防御"
        Defence,
        //% block="击飞"
        Hitover,
        //% block="受身"
        Quickst,
        //% block="倒地"
        Lie,
        //% block="站立"
        Stand
    }

    export enum bulletP{
        //% block="伤害"
        damage,
        //% block="攻击轻重"
        hurted,
        //% block="硬直"
        hitrec,
        //% block="击飞vx"
        xspeed,
        //% block="击飞vy"
        yspeed
    }

    export enum bulletP2{
        //% block="破防"
        breakdef,
        //% block="反射"
        rebound,
        //% block="不受反射"
        indeflectible,
        //% block="碰撞消亡"
        perishTogether,
        //% block="被攻击消亡"
        attachPlayer
    }

    export enum abilityKind{
        //% block="奔跑速度"
        rushspeed,
        //% block="起跳速度"
        jumpspeed,
        //% block="行走速度"
        walkspeed,
        //% block="A攻击伤害"
        damageA, 
        //% block="A攻击硬直"
        hitrecA, 
        //% block="B攻击伤害"
        damageB, 
        //% block="B攻击硬直"
        hitrecB, 
        //% block="防御持续时间"
        defencelas,
        //% block="最长反击反应时间"
        defact,
        //% block="防御减伤系数"
        def,
        //% block="倒地时间"
        downtime,
        //% block="起身无敌时间"
        immutime
    }
    export enum atkimgKind{
        //% block="击拳1"
        hand1,
        //% block="击拳2"
        hand2,
        //% block="踢腿1"
        leg1,
        //% block="踢腿2"
        leg2
    }

    export enum aniKind{
        //% block="受伤动作"
        Hurt,
        //% block="走路动画"
        Walk,
        //% block="站立动画"
        Stand
    }

    export enum overlapKind{
        //% block="敌方弹射物"
        one,
        //% block="敌方精灵"
        two,
        //% block="任意敌方物体"
        three
    }

    //重叠消亡 k(collision): 0=>未碰撞/超时重置, 1=>子弹碰子弹, 2=>子弹碰人
    function perish(sprite: wave, k: number){
        sprite.collision = k
        if(sprite.overlapKind == 3 || sprite.collision == sprite.overlapKind){
            sprite.overlapAct()
        }
        if(sprite.perishTogether == true){
            sprite.destroy()
        }
        else{
            if(sprite.interval == -1 && sprite.collision == 2)
            {
                sprite.interval = setTimeout(function() {
                        sprite.interval = -1
                        sprite.collision = 0
                }, 600)
            }
        }
    }

    sprites.onOverlap(SpriteKind.p2atk, SpriteKind.p1atk, function (sprite, otherSprite) {
        if((<wave>sprite).indeflectible == false 
            && (<wave>sprite).rebound == false && (<wave>otherSprite).rebound == true){
            sprite.setKind(SpriteKind.p1atk)
            sprite.image.flipX()
            sprite.image.flipY()
            sprite.setVelocity(-sprite.vx, -sprite.vy);
            (<wave>sprite).own = (<wave>otherSprite).own;
            (<wave>sprite).dir = (<wave>sprite).dir==1 ? 2 : 1
        }
        else if((<wave>otherSprite).indeflectible == false
            && (<wave>otherSprite).rebound == false && (<wave>sprite).rebound == true){
            otherSprite.setKind(SpriteKind.p2atk)
            otherSprite.image.flipX()
            otherSprite.image.flipY()
            otherSprite.setVelocity(-otherSprite.vx, -otherSprite.vy);
            (<wave>otherSprite).own = (<wave>sprite).own;
            (<wave>otherSprite).dir = (<wave>sprite).dir==1 ? 2 : 1
        }
        else{
            perish(<wave>sprite, 1);
            perish(<wave>otherSprite, 1)
        }
    })

//=================== 自定义人物 ===================
    export class myCharacter{
        basicSet: (p: Character)=>void
        skillSet: (p: Character)=>void
        img: Image
        constructor(){
            this.basicSet = (p: Character)=>{}
            this.skillSet = (p: Character)=>{}
        }
    }

    //let myCharacters: {c: myCharacter, name: string}[] = []
    let myCharacters: { [key: string]: myCharacter; } = {}
    //%block
    //%group="自定义人物"
    //%blockId=basicSet block="自定义人物 %img=screen_image_picker 命名为 %name"
    //%str.defl=SkillKind.A mp.defl=0
    //%weight=99
    //%draggableParameters="player"
    export function basicSet(img: Image, name: string, bs: (player: Character)=>void){
        if(myCharacters[name] != undefined){
            console.log("定义人物时发生人物命名冲突："+name)
            return
        }
        let c = new myCharacter()
        c.basicSet = bs
        myCharacters[name] = c
        //myCharacters.push({c: c, name: name})
        c.img = img
        exportCharacter(name)
    }

    let curSkillPlayer: Character

    //%block
    //%group="技能设置"
    //%blockId=skillSet block="自定义人物 %name 技能"
    //%str.defl=SkillKind.A mp.defl=0
    //%weight=98
    //%draggableParameters="player"
    //%afterOnStart=true
    export function skillSet(name: string, ss: (player: Character)=>void){
        if(myCharacters[name] == undefined){
            console.log("设置技能时人物 '"+name+"' 未定义!")
            return
        }
        myCharacters[name].skillSet = ss
    }

    /*//%block
    //%group="自定义人物"
    //%blockId=exportCharacter block="导出人物 %name"
    export */
    function exportCharacter(name: string){
        if(playGame.characters == undefined){
            playGame.characters = []
        }
        // for(let x of myCharacters){
        //     if(x.name == name){
        //         playGame.characters.push({character: x.c, name: name})
        //         break
        //     }
        // }
        playGame.characters.push({character: myCharacters[name], name: name})
    }

    //%block
    //%group="分隔符"
    //%blockId=bar block="块间分隔标记 %s"
    //%weight=89
    //%color=2
    export function bar(s: string){

    }
//=================== 游戏初始化 ===================
    export function setPlayer(p: Character, kind: PlayerKind){
        p.mySprite.setStayInScreen(true)
        if(kind == PlayerKind.Player1){
            p.player = controller.player1
            p.mySprite.x = 5
            p.mySprite.setKind(SpriteKind.p1body)
            p.bulletkind = SpriteKind.p1atk
            p.startusbarsOffset = -53
            p.laspres = 2
        }
        else{
            p.player = controller.player2
            p.mySprite.x = 155
            p.mySprite.setKind(SpriteKind.p2body)
            p.bulletkind = SpriteKind.p2atk
            p.startusbarsOffset = 53
            p.laspres = 1
        }
    }

    export function overlap(p1: Character, p2: Character){
        scene.setBackgroundColor(1)
        setPlayer(p1, PlayerKind.Player1)
        setPlayer(p2, PlayerKind.Player2)
        p1.startcontroll()
        p2.startcontroll()
        p1.setEnemy(p2.mySprite)
        p2.setEnemy(p1.mySprite)
        p1.mySprite.ay = p2.mySprite.ay = g
        sprites.onOverlap(SpriteKind.p1atk, SpriteKind.p2body, function (sprite, otherSprite) {
            p2.overlap(sprite, otherSprite)
        })
        sprites.onOverlap(SpriteKind.p2atk, SpriteKind.p1body, function (sprite, otherSprite) {
            p1.overlap(sprite, otherSprite)
        })
    }

//=================== 自定义弹射物 ===================

    export class wave extends Sprite{
        damage = 1 //伤害
        hurted = 1 //攻击轻重,越大越容易击倒
        hitrec = 100 //被攻击方硬直时间
        breakdef = false //是否破防
        xspeed = 50 //击飞时的x轴速度
        yspeed = 20 //击飞时的y轴速度
        rebound = false //反射敌方子弹
        indeflectible = false //不受反射
        isDestroyed = false //已消亡
        perishTogether = true //碰撞后消亡
        collision = 1 //上次碰撞类型：0=>未碰撞/超时重制, 1=>子弹碰子弹, 2=>子弹碰人
        interval = -1 //碰撞后不消亡使用的时钟
        circlock = -1 //转圈时钟
        overlapAct = ()=>{} //碰撞后的行为
        overlapKind = 3 //引发overlapAct的碰撞类型：1=>子弹碰子弹, 2=>子弹碰人, 3=>任意
        dir = 2 //朝向 1->左，2->右
        own: Character //归属
        attachOwner = false //所有者被攻击时自动销毁
    }

    function reset(own: Character, bullet: wave, damage = 1, hitrec = 100, hurted = 1, 
    breakdef = false, xspeed = 50, yspeed = 20, rebound = false, 
    indeflectible = false, isDestroyed = false, perishTogether = true){
        bullet.own = own
        bullet.damage = damage //伤害
        bullet.hitrec = hitrec //被攻击方硬直时间
        bullet.hurted = hurted //攻击轻重,越大越容易击倒
        bullet.breakdef = breakdef //是否破防
        bullet.xspeed = xspeed //击飞时的x轴速度
        bullet.yspeed = yspeed //击飞时的y轴速度
        bullet.rebound = rebound //反射敌方子弹
        bullet.indeflectible = indeflectible //不受反射
        bullet.isDestroyed = isDestroyed //已消亡
        bullet.perishTogether = perishTogether //碰撞后消亡
        bullet.collision = 0 //上次碰撞类型：0=>未碰撞/超时重制, 1=>子弹碰子弹, 2=>子弹碰人
        bullet.interval = -1 //碰撞后不消亡使用的时钟
        bullet.circlock = -1
        bullet.overlapAct = ()=>{} //碰撞后的行为
        bullet.overlapKind = 3 //引发overlapAct的碰撞类型：1=>子弹碰子弹, 2=>子弹碰人, 3=>任意
        bullet.dir = 2 //朝向 1->左，2->右
        bullet.attachOwner = false
    }

    //%block
    //% group="自定义弹射物"
    //%blockId=isDestroyed block="%b=variables_get(projectile) 已销毁"
    export function isDestroyed(b: wave): boolean{
        return b.isDestroyed
    }

    //%block
    //% group="自定义弹射物"
    //%blockId=projectileOwner block="%b=variables_get(projectile) 的所有者"
    //%weight=99
    export function projectileOwner(b: wave): Character {
        return b.own
    }

    //%block
    //%group="自定义弹射物"
    //%blockId=blankprojectile block="%p=variables_get(player) 的弹射物"
    //%weight=99
    export function blankprojectile(p: Character): wave{
        let ret = <wave>sprites.createProjectileFromSprite(img`
            .
        `, p.mySprite, p.mySprite.vx, 0)
        reset(p, ret)
        ret.lifespan = 0
        return ret
    }

    //%block
    //%group="自定义弹射物"
    //%blockId=spriteToWave block="将精灵 %b=variables_get(sprite) 转化为弹射物"
    //%weight=100
    export function spriteToWave(b: Sprite): wave{
        return <wave>b
    }

    sprites.onDestroyed(SpriteKind.p1atk, function(sprite: Sprite) {
        let b = <wave>sprite
        b.isDestroyed = true
        if(b.attachOwner){
            for(let i = 0; i < b.own.attachBullet.length; ++i){
                if(b.own.attachBullet[i] == b){
                    b.own.attachBullet.removeAt(i)
                    break
                }
            }
        }
    })
    sprites.onDestroyed(SpriteKind.p2atk, function(sprite: Sprite) {
        let b = <wave>sprite
        b.isDestroyed = true
        if(b.attachOwner){
            for(let i = 0; i < b.own.attachBullet.length; ++i){
                if(b.own.attachBullet[i] == b){
                    b.own.attachBullet.removeAt(i)
                    break
                }
            }
        }
    })

//=================== 动画 ===================
export class projectileAnimation{
    anim: Image[]
    next: projectileAnimation
    interval: number
    lifespan: number
    constructor(anim: Image[], interval: number = 100){
        this.anim = anim
        this.interval = interval
        this.lifespan = anim.length*interval
        this.next = null
    }
}

export function setAnimation(anim: Image[]){
    
}

export function runAnimation(){

}

//=================== 人物 ===================
    export class Character{
        laspres = -1 //方向
        rushspeed = 80 //奔跑速度
        jumpspeed = 100 //起跳速度
        walkspeed = 40 //行走速度
        rightDOWN = 0 //右走中
        leftDOWN = 0 //左走中
        defence = 0 //防御中
        skill = 0 //技能状态
        damageA = 2 //A伤害
        hitrecA = 200
        damageB = 4 //B伤害
        hitrecB = 300
        defencelas = 100 //按一下防御的持续时间
        defact = 300 //反击的最长反应时间
        def = 0.5 //防御减伤系数
        def2 = 1 //防御技能的防御减伤系数
        downtime = 1500 //被击倒躺地上的时间
        immutime = 1500 //起身后的无敌时间
        rush = 0 //奔跑中
        jump = 0 //跳跃中
        combo = 0 //连击中
        attack = 0 //攻击中
        hurted = 0 //受攻击硬直中 -1:防御状态下受伤，0:无受伤，1:受伤，2:受伤瞬间
        hitoverST = 0 //击飞中
        immu = 0 //无敌中
        enemySprite: Sprite = null
        attachBullet: wave[] = []
        setEnemy(other: Sprite){
            this.enemySprite = other
        }
        comboclock = -1 //连击倒计时
        defclock = -1 //反击倒计时
        def2clock = -1 //防御技能计时
        hurtclock = -1 //硬直恢复倒计时
        attackclock = -1 //自动攻击
        hitclock = -1 //被连续击打的最长间隔计时
        hitclock2 = -1 //被连续击打的最短间隔计时
        jumpclock = -1 //起跳落地
        standard = img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f . . . . . . . 
        . . . . . f . . . f . . . . . . 
        . . . . . f . . . f . . . . . . 
        . . . . . f . . . f . . . . . . 
        . . . . . . f f f . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . f f . f . f f . . . . . 
        . . . f f . . f . . f f . . . . 
        . . . f . . . f . . . f . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . f f . . . f f . . . . . 
        . . . . f . . . . . f . . . . . 
        `
        standards: Image[] = null
        rstandards: Image[] = null
        rstandard = img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f . . . . . . . 
        . . . . . f . . . f . . . . . . 
        . . . . . f . . . f . . . . . . 
        . . . . . f . . . f . . . . . . 
        . . . . . . f f f . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . f f . f . f f . . . . . 
        . . . f f . . f . . f f . . . . 
        . . . f . . . f . . . f . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . f f . . . f f . . . . . 
        . . . . f . . . . . f . . . . . 
        `
        defenceimg = img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f . . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f . . . f . . . . . . 
            . . . . . f . . . f . f . . . . 
            . . . . . . f f f . . f . . . . 
            . . . . . . . f . f . f . . . . 
            . . . . . . . f f f f f . . . . 
            . . . . . . . f . f . . . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . f f f f f . . . . . . 
            . . . . f f . . . f f . . . . . 
            . . . . f . . . . . f . . . . . 
            `
        hitover = img`
            . f f f . . . f f f f . . . . .
            f . . . f . f f . . f f . . . .
            f . . . f f f . . . . f f . . .
            f . . . f . f f . . . f f f . .
            . f f f . . . f f . . f . f f .
            . . . . . . . . f f . f f . f f
        `
        quickst = img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f . . . . . . . 
        . . . . . f . . . f . . . . . . 
        . . . . . f . . . f . . . . . . 
        . . . . . f . . . f . . . . . . 
        . . . . . . f f f . . . . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . f f . f . f f . . . . . 
        . . . f f . . f . . f f . . . . 
        . . . f . . . f . . . f . . . . 
        . . . . . . . f . . . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . f f . . . f f . . . . . 
        . . . . f . . . . . f . . . . . 
        `
        lieimg = img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . f f f . . . . . . . . . . . . 
            f . . . f . . . . . . . . . . . 
            f . . . f f f f . . . . . . . . 
            f . . . f . . f f f . . . . . . 
            . f f f . . . . . f f f f f f f 
            `
        attackA = img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . f f f . . . . . . .
            . . . . . f . . . f . . . . . .
            . . . . . f . . . f . . . . . .
            . . . . . f . . . f . . . . . .
            . . . . . . f f f . . . . . . .
            . . . . . . . f . . . . . . . .
            . . . . . f f f f f f f f f f .
            . . . . f f . f . . . . . . . .
            . . . f f . . f . . . . . . . .
            . . . f . . . f . . . . . . . .
            . . . . . . . f . . . . . . . .
            . . . . . f f f f f . . . . . .
            . . . . f f . . . f f . . . . .
            . . . . f . . . . . f . . . . .
        `
        attackB = img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . f f f . . . . . . . . 
                    . . . . f . . . f . . . . . . . 
                    . . . . f . . . f . . . . . . . 
                    . . . . f . . . f . . . . . . . 
                    . . . . . f f f . . . . . . . f 
                    . . . . . . f . . . . . . . f f 
                    . . . . . . f . . . . . . f f . 
                    . . . . f f f f f f . . f f . . 
                    . . . f f . . f . . . f f . . . 
                    . . . f . . . f . . f f . . . . 
                    . . . . . . . . f f f . . . . . 
                    . . . . . . f f f . . . . . . . 
                    . . . . . f f . . . . . . . . . 
                    . . . . . f . . . . . . . . . . 
                    `
        rushA = img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . f f f . . . . . 
                    . . . . . . . f . . . f . . . . 
                    . . . . . . . f . . . f . . . . 
                    . . . . . . . f . . . f . . . . 
                    . . . . . . . . f f f . . . . . 
                    . . . . . . . . . f . . . . . . 
                    . . . . . . . . . f . . . . . . 
                    . . . . . . . . f f f f f f f f 
                    . . . . . . . . f . . . . . . . 
                    . . . . . . . . f . . . . . . . 
                    . . . . . . . f . . . . . . . . 
                    . . . . . . f f f f . . . . . . 
                    . . . . . f . . . f f . . . . . 
                    . . . f f . . . . . f . . . . . 
                    `
        rushB = img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . f f f . . . . . . . . 
                    . . . . f . . . f . . . . . . . 
                    . . . . f . . . f . . . . . . . 
                    . . . . f . . . f . . . . . . . 
                    . . . . . f f f . . . . . . . . 
                    . . . . . . f . . . . . . . . . 
                    . . . . . . f . . . . . . . . . 
                    . . . . . f f f f f f . . . . . 
                    . . . . f f . f . . . . . . . . 
                    . . . . f . . f . . . . . . . . 
                    . . . . . . . . f f f f f f f f 
                    . . . . . . f f f . . . . . . . 
                    . . . . . f . . . . . . . . . . 
                    . . . . . . f f f . . . . . . . 
                    `
        hand = img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . 2 2 2 2 2 2 . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `
        rushhand = img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . 2 2 2 2 2 2 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `
        leg = img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . 2 
            . . . . . . . . . . . . . . 2 2 
            . . . . . . . . . . . . . 2 2 . 
            . . . . . . . . . . . . 2 2 . . 
            . . . . . . . . . . . 2 2 . . . 
            . . . . . . . . . . 2 2 . . . . 
            . . . . . . . . . 2 2 . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `
        rushleg = img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . 2 2 2 2 2 2 2 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `
        hurtedimg = [img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . f f f . . . . . .
            . . . . . . f . . . f . . . . .
            . . . . . . f . . . f . . . . .
            . . . . . . f . . . f . . . . .
            . . . . . . . f f f . . . . . .
            . . . . . . f f . . . . . . . .
            . . . . . f f f f . . . . . . .
            . . . f f f . . f . . . . . . .
            . . . f . f f . f . . . . . . .
            . . . . . . f f . . . . . . . .
            . . . . . . f f f f . . . . . .
            . . . . . . . f . f f . . . . .
            . . . . . . f . . . f . . . . .
        `,
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . f f f . . . . . . . . . . . .
            f . . . f . . . . . . . . . . .
            f . . . f . . . . . . . . . . .
            f . . . f . . . . . . . . . . .
            . f f f . . . . . . . . . . . .
            . . f . . . . . . . . . . . . .
            . f f f f f f . . . . . . . . .
            . f . f f . f f f . . . . . . .
            f f . . f f . . f f . . . . . .
            f . . . . f f f . f . . . . . .
            f f . . . . . f f . . . . . . .
            . . . . . . f f f f . . . . . .
            . . . . . f . . . . f f . . . .
            . . . . . f . . . . . . f . . .
        `,
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . f f f . . . . . . . . . . . .
            f . . . f . . . . . . . . . . .
            f . . . f . . f . . . . . . . .
            f . . . f . . f . . . . . . . .
            . f f f . . f f . . . . . . . .
            . . f . . f f . . . . . . . . .
            . f f f f f . . . . . . . . . .
            . f . f f . . . . . . . . . . .
            f f . . f f . . . . . . . . . .
            f . . . . f f f f . . . . . . .
            . . . . . . . f f f f . . . . .
            . . . . . . . f . . f f . . . .
            . . . . . . . f f . . f f . . .
            . . . . . . . . f f . . . . . .
        `]
        walkimg = [img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . f f . . . . . .
            . . . . . . . f . . f . . . . .
            . . . . . . . f . . f . . . . .
            . . . . . . . f . . f . . . . .
            . . . . . . . . f f . . . . . .
            . . . . . . . f f . . . . . . .
            . . . . . . . f f . . . . . . .
            . . . . . f f f f f f . . . . .
            . . . . f f . f . . . . . . . .
            . . . . f . . f . . . . . . . .
            . . . . . . f f f . . . . . . .
            . . . . . f f . f f . f . . . .
            . . . . f f . . . f f f . . . .
            . . . . f . . . . . . . . . . .
        `,
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . f f . . . . . . .
            . . . . . . f . . f . . . . . .
            . . . . . . f . . f . . . . . .
            . . . . . . f . . f . . . . . .
            . . . . . . . f f . . . . . . .
            . . . . . . . f . . f . . . . .
            . . . . . f f f . . f . . . . .
            . . . . f f . f f f f . . . . .
            . . . . f . . f . . . . . . . .
            . . . f f . f f . . . . . . . .
            . . . . . . f f f . . . . . . .
            . . . . . f f . f . . . . . . .
            . . . . f f . . f f . . . . . .
            . . . . . . . . . f f . . . . .
        `,
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . f f . . . . . . .
            . . . . . . f . . f . . . . . .
            . . . . . . f . . f . . . . . .
            . . . . . . f . . f . . . . . .
            . . . . . . . f f . . . . . . .
            . . . . . . . f . . f . . . . .
            . . . . . . . f . . f . . . . .
            . . . . . f f f f f f . . . . .
            . . . . f f . f . . . . . . . .
            . . . . f . . f . . . . . . . .
            . . . f . . f f . . . . . . . .
            . . . f f f f f . . . . . . . .
            . . . . . . . f f f . . . . . .
            . . . . . . . . . f f . . . . .
        `
        ]

        //% group="人物参数" blockSetVariable="player"
        //% blockCombine block="精灵" callInDebugger
        //%weight=80
        get sprite(): Sprite {
            return this.mySprite
        }

        //% group="人物参数" blockSetVariable="player"
        //% blockCombine block="敌方精灵" callInDebugger
        //%weight=80
        get enemy(): Sprite {
            return this.enemySprite
        }

        //% group="人物参数" blockSetVariable="player"
        //% blockCombine block="x" callInDebugger
        //%weight=81
        get x(): number {
            return this.mySprite.x
        }

        //% group="人物参数" blockSetVariable="player"
        //% blockCombine block="y" callInDebugger
        //%weight=81
        get y(): number {
            return this.mySprite.y
        }

        //% group="人物参数" blockSetVariable="player"
        //% blockCombine block="血量" callInDebugger
        get hp(): number {
            return this.statusbar.value
        }

        //% group="人物参数" blockSetVariable="player"
        //% blockCombine block="mp" callInDebugger
        get mp(): number {
            return this.mpbar.value
        }

        //% group="人物参数" blockSetVariable="player"
        //% blockCombine block="血量" callInDebugger
        set hp(v : number) {
            this.statusbar.value = v
        }

        //% group="人物参数" blockSetVariable="player"
        //% blockCombine block="mp" callInDebugger
        set mp(v : number) {
            this.mpbar.value = v
        }

        // 暂停控制
        stop () {
            this.move(0)
        }
        // 恢复控制
        move (speed: number) {
            this.player.moveSprite(this.mySprite, speed, 0)
        }

        // 从攻击、硬直、防御、奔跑等状态恢复
        stand (interrupt : boolean = false) {
            if(!interrupt || (2&this.attack|this.hurted) == 0){
                this.mySprite.setImage(this.standard.clone())
                if(this.laspres == 1){
                    this.mySprite.image.flipX()
                }
                this.hurted = 0
                this.defence = 0
                if(this.rush == 1){
                    this.rush = 0
                    this.skill = 0
                    if(this.rightDOWN == 5 || this.rightDOWN == 3){
                        this.rightDOWN = 0
                    }
                    if(this.leftDOWN == 5 || this.leftDOWN == 3){
                        this.leftDOWN = 0
                    }
                }
                this.attack = 0
                if(this.jump == 0){
                    this.mySprite.vx = 0
                    this.move(this.walkspeed)
                }
            }
        }
        // 落地之后做某事
        toground(dosth: ()=>void){
            let f = false
            if(this.jump == 1 && this.hitoverST == 1){ //受身
                this.hitoverST = 0
                this.mySprite.setImage(this.quickst.clone())
                if(this.laspres == 1){
                    this.mySprite.image.flipX()
                }
                clearInterval(this.jumpclock)
                this.jumpclock = -1
                this.hits = 0
                this.hits2 = 0
                f = true
            }
            let ty = this.mySprite.y
            this.jumpclock = setInterval(()=>{
                if(this.mySprite.y == ty){
                    dosth()
                    clearInterval(this.jumpclock)
                    this.jumpclock = -1
                    if(f){
                        this.stand()
                        this.move(this.walkspeed)
                    }
                }
                else{
                    ty = this.mySprite.y
                }
            }, 100)
        }
    //=================== 中弹 ===================
        hits = 0
        hits2 = 0
        overlap(sprite: Sprite, otherSprite: Sprite) {
            if((<wave>sprite).interval != -1){
                return
            }
            if(this.immu == 1){
                perish(<wave>sprite, 0)
                return
            }
            if((<wave>sprite).damage == 0){
                return
            }
            if ((this.defence == 1 || this.def2 != 1) && !((<wave>sprite).breakdef)) {
                clearTimeout(this.defclock)
                this.defclock = -1
                this.statusbar.value -= (<wave>sprite).damage * this.def * this.def2
                let img = this.defenceimg.clone()
                if(sprite.x < otherSprite.x){
                    img.flipX()
                    this.laspres = 1
                }
                else{
                    this.laspres = 2
                }
                if(this.defence == 1 && this.def2 == 1){
                    this.mySprite.setImage(img)
                    this.hurted = -1
                    this.defclock = setTimeout(()=>{
                        this.defclock = -1
                        if(this.hurted == -1){
                            this.hurted = 0
                        }
                    }, this.defact)
                }
            } else {
                if(this.attack == 2){
                    clearInterval(this.attackclock)
                    this.attackclock = -1
                }
                animation.stopAnimation(animation.AnimationTypes.All, this.mySprite)
                this.defence = 0
                this.def2 = 1
                clearTimeout(this.def2clock)
                this.def2clock=-1
                this.attack = 0
                this.skill = 0
                this.mySprite.vx = 0
                this.statusbar.value -= (<wave>sprite).damage
                if(this.hits < -100){
                    if(this.hurted != 2){
                        this.mySprite.vy = Math.max(this.mySprite.vy-(<wave>sprite).yspeed, -150)
                        this.mySprite.vx = sprite.x < otherSprite.x ? (<wave>sprite).xspeed : -(<wave>sprite).xspeed
                        this.mySprite.image.flipY()
                        this.hurted = 2
                        clearTimeout(this.hitclock2)
                        this.hitclock2 = setTimeout(()=>{
                            if(this.hurted == 2){
                                this.hurted = 1
                                this.hits2 = this.hits
                            }
                            this.hitclock2 = -1
                        }, 100)
                    }
                }
                else{
                    if(this.hurted != 2){
                        this.hurted = 2
                        clearTimeout(this.hitclock2)
                        this.hitclock2 = setTimeout(()=>{
                            if(this.hurted == 2){
                                this.hurted = 1
                                this.hits2 = this.hits
                            }
                            this.hitclock2 = -1
                        }, 100)
                    }
                    this.hits = Math.max(this.hits2+(<wave>sprite).hurted, this.hits)
                    //this.hits += (<wave>sprite).hurted //Math.max(++this.hits, (<wave>sprite).hurted)
                    this.hitrec((<wave>sprite).hitrec, this.hits-1, sprite.x < otherSprite.x, <wave>sprite)
                }
                while (this.attachBullet.length != 0) {
                    let b = this.attachBullet.removeAt(0)
                    b.destroy()
                }
            }
            perish(<wave>sprite, 2)
            if (this.statusbar.value == 0) {
                if(this.player == controller.player1){
                    game.splash("player2 win!")
                }
                else{
                    game.splash("player1 win!")
                }
                game.reset()
            }
        }

        hitrec(time: number, kind: number, dir: boolean, pro: wave){
            clearTimeout(this.hitclock)
            this.hitclock = -1
            clearTimeout(this.hurtclock)
            this.hurtclock = -1
            this.stop()
            if(kind >= this.hurtedimg.length || this.jump == 1){
                this.mySprite.setImage(this.hitover.clone())
                this.hits = -999
                this.mySprite.vy = -pro.yspeed
                this.mySprite.vx = dir ? pro.xspeed : -pro.xspeed
                if(this.jump == 1){
                    clearInterval(this.jumpclock)
                    this.jumpclock = -1
                    this.jump = 0
                }
                this.hitoverST = 1
                this.toground(()=>{
                    this.mySprite.setImage(this.lieimg.clone())
                    if(dir){
                        this.mySprite.image.flipX()
                    }
                    this.mySprite.vx = 0
                    this.immu = 1
                    this.hits = 0
                    this.hits2 = 0
                    this.hitoverST = 0
                    setTimeout(()=>{
                        let c1: number
                        let c2: number
                        let c3: number
                        c1 = setInterval(()=>{
                            this.mySprite.setFlag(SpriteFlag.Invisible, true)
                        }, 200)
                        c3 = setTimeout(()=>{
                            c3 = -1
                            c2 = setInterval(()=>{
                                this.mySprite.setFlag(SpriteFlag.Invisible, false)
                            }, 200)
                        }, 100)
                        this.stand()
                        setTimeout(()=>{
                            this.immu = 0
                            clearInterval(c1)
                            clearInterval(c2)
                            clearTimeout(c3)
                            this.mySprite.setFlag(SpriteFlag.Invisible, false)
                        }, this.immutime)
                    }, this.downtime)
                })
            }
            else{
                this.mySprite.setImage(this.hurtedimg[kind].clone())
                this.hurtclock = setTimeout(()=>{this.hurtclock = -1; this.stand()}, time)
                this.hitclock = setTimeout(()=>{this.hitclock = -1; this.hits = 0}, 1000)
            }
            if(dir){
                this.mySprite.image.flipX()
                this.laspres = 1
            }
            else {
                this.laspres = 2
            }
        }
    //=================== 攻击行为 ===================
        attackPosture(atk: Image, life: number){
            this.attack = 1
            let img222 = atk.clone()
            animation.stopAnimation(animation.AnimationTypes.All, this.mySprite)
            let projectile = <wave>sprites.createProjectileFromSprite(img222, this.mySprite, this.mySprite.vx, 0)
            projectile.lifespan = life;
            let follow: number
            follow = setInterval(()=>{
                if(projectile != null && !projectile.isDestroyed){
                    if(this.hurted == 0){
                        projectile.setPosition(this.mySprite.x, this.mySprite.y)
                    }
                    else{
                        projectile.destroy();
                    }
                }
                else{
                    clearInterval(follow)
                    follow = -1
                }
            }, 10)
            reset(this, projectile)
            if (this.laspres == 1) {
                projectile.image.flipX()
                projectile.dir = 1
            }
            projectile.setKind(this.bulletkind)
            projectile.indeflectible = true
            return projectile
        }
        attackAction (atk: Image, life: number, Aatk: boolean) {
            let projectile = this.attackPosture(atk, life)
            if(Aatk){
                reset(this, projectile, this.damageA, this.hitrecA)
            }
            else{
                reset(this, projectile, this.damageB, this.hitrecB, 2)
            }
        }
        
        rushAttack(atk = 'A', time = 300){
            if(this.hurted != 0){
                return
            }
            let f = atk == 'A'
            this.attackAction(f ? this.rushhand : this.rushleg, time, f)
            this.defence = 0
            this.mySprite.setImage((f ? this.rushA : this.rushB).clone())
            if (this.laspres == 1) {
                this.mySprite.image.flipX()
            }
            setTimeout(()=>{this.stand(true)}, time)
        }
        basicAttack(atk = 'A', time = 200){
            if(this.hurted != 0){
                return
            }
            let h = atk == 'A'
            this.attackAction(h ? this.hand : this.leg, time, h)
            this.defence = 0
            this.stop()
            this.mySprite.setImage((h ? this.attackA : this.attackB).clone())
            if (this.laspres == 1) {
                this.mySprite.image.flipX()
            }
            setTimeout(()=>{this.stand(true)}, time)
        }
        defaultshoot = (s:wave)=>{}

        // 自动攻击，暂停控制，按[下]退出
        autoAttack(time: number, mp: number, atk: ()=>void){
            this.stop()
            this.attack = 2
            this.attackclock = setInterval(()=>{
                    if(mp > this.mpbar.value){
                        clearInterval(this.attackclock)
                        this.stand()
                        this.attackclock = -1
                    }
                    else{
                        this.mpbar.value -= mp
                        atk()
                    }
                }, time)
            this.defence = 0
        }
        // 反击，防御状态被攻击才能发出
        counterAttack(mp: number, atk: ()=>void){
            if(this.hurted == -1 && mp <= this.mpbar.value){
                this.hurted = 0
                this.skill = 0
                this.mpbar.value -= mp
                atk()
                if(this.defence != 0){
                    this.stand(true)
                }
            }
        }

        defaultskill(){
            //=================== A键释放的技能 ===================
            setSkill(this, SkillKind.A, 0, (tempVar: tempVarDic, that: Character)=>{ //平A: A
                that.basicAttack('A')
            })
            
            setSkill(this, SkillKind.A1, 0, (tempVar: tempVarDic, that: Character)=>{ //反击: ⬇️+A
                that.counterAttack(0, ()=>{
                    that.basicAttack('A')
                    let s = 60
                    for(let i = 0; i < 3; ++i){
                        for(let i = 0; i < 3; ++i){
                            shoot(that, 60, 180, 4, s, that.mySprite.x, that.mySprite.y, img`
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . 4 4 . . . . . . .
                                . . . . . . 4 5 5 4 . . . . . .
                                . . . . . . 2 5 5 2 . . . . . .
                                . . . . . . . 2 2 . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                            `, that.defaultshoot)
                            s += 3
                        }
                        shoot(that, 60, 180, 4, s, that.mySprite.x, that.mySprite.y, img`
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . 4 4 . . . . . . .
                            . . . . . . 4 5 5 4 . . . . . .
                            . . . . . . 2 5 5 2 . . . . . .
                            . . . . . . . 2 2 . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                        `, that.defaultshoot)
                        s += 10
                    }
                })
            })

            setSkill(this, SkillKind.A2, 0, (tempVar: tempVarDic, that: Character)=>{ //跳起攻击: ⬆️+A
                that.basicAttack('A')
            })

            setSkill(this, SkillKind.A3, 0, (tempVar: tempVarDic, that: Character)=>{ //跳起特殊攻击: ⬇️+⬆️+A
                that.basicAttack('A')
                let offset2 = 0
                let acc = 0
                for(let i = 0; i < 4; ++i){
                    shoot(that, 120+offset2, 300+offset2, 6, 50+acc, that.mySprite.x, that.mySprite.y, img`
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . 2 2 . . . . . . .
                        . . . . . . 3 1 1 3 . . . . . .
                        . . . . . 2 1 1 1 1 2 . . . . .
                        . . . . . 2 1 1 1 1 2 . . . . .
                        . . . . . . 3 1 1 3 . . . . . .
                        . . . . . . . 2 2 . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                    `, (s:wave)=>{
                        s.lifespan = 600
                        s.damage = 1
                    })
                    offset2 += 5
                    acc += 5
                }
            })

            setSkill(this, SkillKind.A4, 0, (tempVar: tempVarDic, that: Character)=>{ //冲刺: ➡️➡️+A
                that.rushAttack('A')
            })

            setSkill(this, SkillKind.A6, 0, (tempVar: tempVarDic, that: Character)=>{ //冲跳攻: ➡️➡️+⬆️+A
                that.rushAttack('A')
            })

            setSkill(this, SkillKind.A8, 0, (tempVar: tempVarDic, that: Character)=>{ //平A2: ➡️+A
                that.basicAttack('A')
                shoot(that, 180, 180, 1, 60, that.mySprite.x,that.mySprite.y,img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . 8 8 8 8 . . .
                    . . . . . . . 8 8 1 1 1 1 8 . .
                    . . . . 8 8 9 9 1 1 1 1 1 1 8 .
                    . . 9 9 9 9 1 1 1 1 1 1 1 1 8 .
                    . . 1 1 1 1 1 1 1 1 1 1 1 1 8 .
                    . . 9 9 8 8 9 1 1 1 1 1 1 1 8 .
                    . . . . . . 8 8 9 1 1 1 1 8 . .
                    . . . . . . . . . 8 8 8 8 . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                `, (b:wave)=>{
                    b.hitrec = 1200
                })
            })

            setSkill(this, SkillKind.A9, 0, (tempVar: tempVarDic, that: Character)=>{ //反击2: ↘️+A
                that.basicAttack('A')
                let s = 40
                let a = 10
                let t = 600
                for(let i = 0; i < 8; ++i){
                    shoot(that, a, a, 1, s, that.mySprite.x, that.mySprite.y, img`
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . 6 6 . . . . . . .
                        . . . . . . 6 9 9 6 . . . . . .
                        . . . . . . 8 9 9 8 . . . . . .
                        . . . . . . . 8 8 . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                    `,
                    (b: wave)=>{
                        setTimeout(()=>{
                            b.vx *= 1.5
                            b.vy *= 1.5
                            aimedshot(b)
                        }, t)
                    })
                    s += 10
                    a+= 160/8
                    t += 100
                }
            })

            setSkill(this, SkillKind.A10, 0, (tempVar: tempVarDic, that: Character)=>{ //必杀: ⬇️+➡️+A
                that.rushAttack('A')
                let d = that.laspres == 1 ? -10 : 10
                shoot(that, 180, 180, 1, 60, that.mySprite.x+d,that.mySprite.y,img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . 2 2 2 2 . . .
                    . . . 2 2 2 2 2 2 1 1 1 1 2 . .
                    . . . 3 3 3 3 3 1 1 1 1 1 1 . .
                    . . . 1 1 1 1 1 1 1 1 1 1 1 . .
                    . . . 1 1 1 1 1 1 1 1 1 1 1 . .
                    . . . 3 3 3 3 3 1 1 1 1 1 1 . .
                    . . . 2 2 2 2 2 3 1 1 1 1 2 . .
                    . . . . . . . . . 2 2 2 2 . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                `, (s:wave)=>{
                        s.damage = 1
                        s.indeflectible = true
                    })
                that.autoAttack(185, 0 ,()=>{
                    shoot(that, 180, 180, 1, 60, that.mySprite.x+d,that.mySprite.y,img`
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . 2 2 2 2 2 2 2 2 2 2 2 2 . .
                        . . 3 3 3 3 3 3 3 3 3 3 3 3 . .
                        . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
                        . . 1 1 1 1 1 1 1 1 1 1 1 1 . .
                        . . 3 3 3 3 3 3 3 3 3 3 3 3 . .
                        . . 2 2 2 2 2 2 2 2 2 2 2 2 . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                    `, (s:wave)=>{
                        s.damage = 1
                        s.indeflectible = true
                    })
                })
            })
            //=================== B键释放的技能 ===================
            setSkill(this, SkillKind.B, 0, (tempVar: tempVarDic, that: Character)=>{ //平A: B
                that.basicAttack('B')
            })

            setSkill(this, SkillKind.B1, 0, (tempVar: tempVarDic, that: Character)=>{ //反击: ⬇️+B
                that.basicAttack('B')
            })

            setSkill(this, SkillKind.B2, 0, (tempVar: tempVarDic, that: Character)=>{ //跳起攻击: ⬆️+B
                that.basicAttack('B')
            })

            setSkill(this, SkillKind.B3, 0, (tempVar: tempVarDic, that: Character)=>{ //跳起特殊攻击: ⬇️+⬆️+B
                let e = -5
                if(that.enemySprite.x > that.mySprite.x){
                    that.laspres = 1
                    e = -e
                }
                else that.laspres = 2
                that.mySprite.setPosition(that.enemySprite.x+e, that.enemySprite.y)
                that.basicAttack('B')
            })

            setSkill(this, SkillKind.B4, 0, (tempVar: tempVarDic, that: Character)=>{ //冲刺: ➡️➡️+B
                that.rushAttack('B')
            })

            setSkill(this, SkillKind.B6, 0, (tempVar: tempVarDic, that: Character)=>{ //冲跳攻: ➡️➡️+⬆️+B
                that.rushAttack('B')
            })

            setSkill(this, SkillKind.B8, 0, (tempVar: tempVarDic, that: Character)=>{ //平A2: ➡️+B
                that.rushAttack('A') //'B'
                let x = that.laspres == 1 ? -15 : 15
                let j = x
                let u = 0
                for(let index2 = 0; index2 < 3; index2++){
                    setTimeout(()=>{
                        shoot(that, 180,180,1,0,that.mySprite.x+x,that.mySprite.y,img`
                            . . . . . . . . . . . . . . . .
                            . . . . . . . . . . . . . . . .
                            . . . . . 4 4 4 4 4 . . . . . .
                            . . . 4 4 4 5 5 5 d 4 4 4 4 . .
                            . . 4 d 5 d 5 5 5 d d d 4 4 . .
                            . . 4 5 5 1 1 1 d d 5 5 5 4 . .
                            . 4 5 5 5 1 1 1 5 1 1 5 5 4 4 .
                            . 4 d d 1 1 5 5 5 1 1 5 5 d 4 .
                            . 4 5 5 1 1 5 1 1 5 5 d d d 4 .
                            . 2 5 5 5 d 1 1 1 5 1 1 5 5 2 .
                            . 2 d 5 5 d 1 1 1 5 1 1 5 5 2 .
                            . . 2 4 d d 5 5 5 5 d d 5 4 . .
                            . . . 2 2 4 d 5 5 d d 4 4 . . .
                            . . 2 2 2 2 2 4 4 4 2 2 2 . . .
                            . . . 2 2 4 4 4 4 4 4 2 2 . . .
                            . . . . . 2 2 2 2 2 2 . . . . .
                        `,(s)=>{
                            let pro = sprites.createProjectileFromSprite(img`
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                            `, s, 0, 0)
                            s.lifespan = 600
                            s.hurted = 4
                            s.breakdef = true
                            s.yspeed = 120
                            s.xspeed = 80
                            s.indeflectible = true
                            pro.lifespan = 600
                            animation.runImageAnimation(pro, [img`
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . 4 4 4 4 4 . . . . . .
                                . . . 4 4 4 5 5 5 d 4 4 4 4 . .
                                . . 4 d 5 d 5 5 5 d d d 4 4 . .
                                . . 4 5 5 1 1 1 d d 5 5 5 4 . .
                                . 4 5 5 5 1 1 1 5 1 1 5 5 4 4 .
                                . 4 d d 1 1 5 5 5 1 1 5 5 d 4 .
                                . 4 5 5 1 1 5 1 1 5 5 d d d 4 .
                                . 2 5 5 5 d 1 1 1 5 1 1 5 5 2 .
                                . 2 d 5 5 d 1 1 1 5 1 1 5 5 2 .
                                . . 2 4 d d 5 5 5 5 d d 5 4 . .
                                . . . 2 2 4 d 5 5 d d 4 4 . . .
                                . . 2 2 2 2 2 4 4 4 2 2 2 . . .
                                . . . 2 2 4 4 4 4 4 4 2 2 . . .
                                . . . . . 2 2 2 2 2 2 . . . . .
                            `,img`
                                . . . . 2 2 2 2 2 2 2 2 . . . .
                                . . . 2 4 4 4 5 5 4 4 4 2 2 2 .
                                . 2 2 5 5 d 4 5 5 5 4 4 4 4 2 .
                                . 2 4 5 5 5 5 d 5 5 5 4 5 4 2 2
                                . 2 4 d d 5 5 5 5 5 5 d 4 4 4 2
                                2 4 5 5 d 5 5 5 d d d 5 5 5 4 4
                                2 4 5 5 4 4 4 d 5 5 d 5 5 5 4 4
                                4 4 4 4 . . 2 4 5 5 . . 4 4 4 4
                                . . b b b b 2 4 4 2 b b b b . .
                                . b d d d d 2 4 4 2 d d d d b .
                                b d d b b b 2 4 4 2 b b b d d b
                                b d d b b b b b b b b b b d d b
                                b b d 1 1 3 1 1 d 1 d 1 1 d b b
                                . . b b d d 1 1 3 d d 1 b b . .
                                . . 2 2 4 4 4 4 4 4 4 4 2 2 . .
                                . . . 2 2 4 4 4 4 4 2 2 2 . . .
                            `,img`
                                . . . . . . . . b b . . . . . .
                                . . . . . . . . b b . . . . . .
                                . . . b b b . . . . . . . . . .
                                . . b d d b . . . . . . . b b .
                                . b d d d b . . . . . . b d d b
                                . b d d b . . . . b b . b d d b
                                . b b b . . . . . b b . . b b .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . b b b d d d d d d b b b . .
                                . b d c c c b b b b c c d d b .
                                b d d c b . . . . . b c c d d b
                                c d d b b . . . . . . b c d d c
                                c b d d d b b . . . . b d d c c
                                . c c b d d d d b . c c c c c c
                                . . . c c c c c c . . . . . . .
                            `],200)
                        })
                        x += j
                    }, u)
                    u += 100
                }
            })

            setSkill(this, SkillKind.B9, 0, (tempVar: tempVarDic, that: Character)=>{ //反击2: ↘️+B
                that.basicAttack('A')
                shoot(that, 0,0,1,0,that.mySprite.x,that.mySprite.y,img`
                    ......88888888......
                    .....8999999998.....
                    ....891111111198....
                    ...891........198...
                    ..891..........198..
                    .891............198.
                    891..............198
                    891..............198
                    891..............198
                    891..............198
                    891..............198
                    891..............198
                    891..............198
                    891..............198
                    .891............198.
                    ..891..........198..
                    ...891........198...
                    ....891111111198....
                    .....8999999998.....
                    ......88888888......
                `,(s)=>{
                    s.damage = 10
                    s.indeflectible = true
                    s.rebound = true
                    s.lifespan = 300
                })
            })

            setSkill(this, SkillKind.B10, 0, (tempVar: tempVarDic, that: Character)=>{ //必杀: ⬇️+➡️+B
                that.rushAttack('B')
            })
        }
    //=================== A键释放的技能 ===================
        skill0A = {f: (tempVar: tempVarDic, that: Character)=>{ //平A: A
            that.basicAttack('A')
        }, mp: 0}

        skill1A = {f: (tempVar: tempVarDic, that: Character)=>{ //反击: ⬇️+A
            that.basicAttack('A')
        }, mp: 0}
        skill2A = {f: (tempVar: tempVarDic, that: Character)=>{ //跳起攻击: ⬆️+A
            that.basicAttack('A')
        }, mp: 0}

        skill3A = {f: (tempVar: tempVarDic, that: Character)=>{ //跳起特殊攻击: ⬇️+⬆️+A
            that.basicAttack('A')
        }, mp: 0}

        skill4A = {f: (tempVar: tempVarDic, that: Character)=>{ //冲刺: ➡️➡️+A
            that.rushAttack('A')
        }, mp: 0}

        skill6A = {f: (tempVar: tempVarDic, that: Character)=>{ //冲跳攻: ➡️➡️+⬆️+A
            that.rushAttack('A')
        }, mp: 0}

        skill8A = {f: (tempVar: tempVarDic, that: Character)=>{ //平A2: ➡️+A
            that.basicAttack('A')
        }, mp: 0}

        skill9A = {f: (tempVar: tempVarDic, that: Character)=>{ //反击2: ↘️+A
            that.basicAttack('A')
        }, mp: 0}
        
        skill10A = {f: (tempVar: tempVarDic, that: Character)=>{ //必杀: ⬇️+➡️+A
            that.rushAttack('A')
        }, mp: 0}
    //=================== B键释放的技能 ===================
        skill0B = {f: (tempVar: tempVarDic, that: Character)=>{ //平A: B
            that.basicAttack('B')
        }, mp: 0}

        skill1B = {f: (tempVar: tempVarDic, that: Character)=>{ //反击: ⬇️+B
            that.basicAttack('B')
        }, mp: 0}

        skill2B = {f: (tempVar: tempVarDic, that: Character)=>{ //跳起攻击: ⬆️+B
            that.basicAttack('B')
        }, mp: 0}

        skill3B = {f: (tempVar: tempVarDic, that: Character)=>{ //跳起特殊攻击: ⬇️+⬆️+B
            that.basicAttack('B')
        }, mp: 0}

        skill4B = {f: (tempVar: tempVarDic, that: Character)=>{ //冲刺: ➡️➡️+B
            that.rushAttack('B')
        }, mp: 0}

        skill6B = {f: (tempVar: tempVarDic, that: Character)=>{ //冲跳攻: ➡️➡️+⬆️+B
            that.rushAttack('B')
        }, mp: 0}

        skill8B = {f: (tempVar: tempVarDic, that: Character)=>{ //平A2: ➡️+B
            that.rushAttack('A') //'B'
        }, mp: 0}

        skill9B = {f: (tempVar: tempVarDic, that: Character)=>{ //反击2: ↘️+B
            that.basicAttack('A')
        }, mp: 0}

        skill10B = {f: (tempVar: tempVarDic, that: Character)=>{ //必杀: ⬇️+➡️+B
            that.rushAttack('B')
        }, mp: 0}
    //=================== 按键事件 ===================
        Adown () {
            if (this.attack != 0 || this.hurted > 0) {
                return
            }
            if(this.skill == 0){   
                if(this.skill0A.mp > this.mpbar.value){
                    return
                }
                this.mpbar.value -= this.skill0A.mp
                this.skill0A.f(new tempVarDic(), this)
            }
            else if(this.skill == 1){
                if(this.skill1A.mp > this.mpbar.value){
                    return
                }   
                this.mpbar.value -= this.skill1A.mp
                this.skill1A.f(new tempVarDic(), this)
            }
            else if(this.skill == 2){
                if(this.skill2A.mp > this.mpbar.value){
                    return
                }   
                this.mpbar.value -= this.skill2A.mp
                this.skill2A.f(new tempVarDic(), this)
            }
            else if(this.skill == 3){  
                if(this.skill3A.mp > this.mpbar.value){
                    return
                }             
                this.mpbar.value -= this.skill3A.mp
                this.skill3A.f(new tempVarDic(), this)
            }
            else if(this.skill == 4){
                if(this.skill4A.mp > this.mpbar.value){
                    return
                }   
                this.mpbar.value -= this.skill4A.mp
                this.skill = 0
                this.skill4A.f(new tempVarDic(), this)
            }
            else if(this.skill == 6){
                if(this.skill6A.mp > this.mpbar.value){
                    return
                }   
                this.mpbar.value -= this.skill6A.mp
                this.skill = 2
                this.skill6A.f(new tempVarDic(), this)
            }
            else if(this.skill == 8){
                if(this.skill8A.mp > this.mpbar.value){
                    return
                }   
                this.mpbar.value -= this.skill8A.mp
                this.skill8A.f(new tempVarDic(), this)
            }
            else if(this.skill == 9){
                if(this.skill9A.mp > this.mpbar.value){
                    return
                }   
                this.mpbar.value -= this.skill9A.mp
                this.skill = 0
                this.skill9A.f(new tempVarDic(), this)
            }
            else if(this.skill == 10){
                if(this.skill10A.mp > this.mpbar.value){
                    return
                }   
                this.mpbar.value -= this.skill10A.mp
                this.skill = 0
                this.skill10A.f(new tempVarDic(), this)
            }
            else this.attack = 0
        }
        Bdown () {
            if (this.attack != 0 || this.hurted > 0) {
                return
            }
            if(this.skill == 0){   
                if(this.skill0B.mp > this.mpbar.value){
                    return
                }
                this.mpbar.value -= this.skill0B.mp
                this.skill0B.f(new tempVarDic(), this)
            }
            else if(this.skill == 1){
                if(this.skill1B.mp > this.mpbar.value){
                    return
                }   
                this.mpbar.value -= this.skill1B.mp
                this.skill1B.f(new tempVarDic(), this)
            }
            else if(this.skill == 2){
                if(this.skill2B.mp > this.mpbar.value){
                    return
                }   
                this.mpbar.value -= this.skill2B.mp
                this.skill2B.f(new tempVarDic(), this)
            }
            else if(this.skill == 3){  
                if(this.skill3B.mp > this.mpbar.value){
                    return
                }             
                this.mpbar.value -= this.skill3B.mp
                this.skill3B.f(new tempVarDic(), this)
            }
            else if(this.skill == 4){
                if(this.skill4B.mp > this.mpbar.value){
                    return
                }   
                this.mpbar.value -= this.skill4B.mp
                this.skill = 0
                this.skill4B.f(new tempVarDic(), this)
            }
            else if(this.skill == 6){
                if(this.skill6B.mp > this.mpbar.value){
                    return
                }   
                this.mpbar.value -= this.skill6B.mp
                this.skill = 2
                this.skill6B.f(new tempVarDic(), this)
            }
            else if(this.skill == 8){
                if(this.skill8B.mp > this.mpbar.value){
                    return
                }   
                this.mpbar.value -= this.skill8B.mp
                this.skill8B.f(new tempVarDic(), this)
            }
            else if(this.skill == 9){
                if(this.skill9B.mp > this.mpbar.value){
                    return
                }   
                this.mpbar.value -= this.skill9B.mp
                this.skill = 0
                this.skill9B.f(new tempVarDic(), this)
            }
            else if(this.skill == 10){
                if(this.skill10B.mp > this.mpbar.value){
                    return
                }   
                this.mpbar.value -= this.skill10B.mp
                this.skill = 0
                this.skill10B.f(new tempVarDic(), this)
            }
            else this.attack = 0
        }
        downdown () {
            if(this.attack == 2){
                clearInterval(this.attackclock)
                this.attackclock = -1
                this.stand()
            }
            if ((this.jump | this.defence | this.attack | this.hurted) != 0) {
                return
            }
            if (this.skill == 0 || this.skill == 8 || this.skill == 4) {
                this.skill = 1
            }
            clearTimeout(this.comboclock)
            this.comboclock = -1
            this.defence = 1
            this.move(this.walkspeed/2)
            if(this.rush == 1){
                this.rush = 0
                this.rightDOWN = this.rightDOWN == 3 ? -1 : 0
                this.leftDOWN = this.leftDOWN == 3 ? -1 : 0
            }
            animation.stopAnimation(animation.AnimationTypes.All, this.mySprite)
            this.mySprite.setImage(this.defenceimg.clone())
            if(this.laspres == 1){
                this.mySprite.image.flipX()
            }
        }
        downup () {
            if(this.attack == 2){
                return
            }
            setTimeout(()=>{
                if(this.defence == 1 && this.attack != 1){
                    this.stand()
                    if(this.skill == 1 || this.skill == 9 || this.skill == 10){
                        this.skill = 0
                    }
                }
            }, this.defencelas)
            
        }
        updown () {
            if (this.attack != 0 || this.hurted > 0 && this.hitoverST == 0) {
                return
            }
            if (this.jump == 0) {
                clearTimeout(this.comboclock)
                this.comboclock = -1
                if(this.skill == 0 || this.skill == 8){
                    this.skill = 2
                }
                else if(this.skill == 1 || this.skill == 9 || this.skill == 10){
                    this.skill = 3
                }
                else if(this.skill == 4){
                    this.skill = 6
                }
                if(this.defence == 1){
                    this.stand()
                }
                // 起跳后无法左右移动
                this.jump = 1
                this.stop()
                if (this.leftDOWN == 1 || this.leftDOWN == -1) {
                    this.mySprite.vx = -this.walkspeed
                } else if (this.rightDOWN == 1 || this.rightDOWN == -1) {
                    this.mySprite.vx = this.walkspeed
                }
                this.mySprite.vy = -this.jumpspeed
                this.toground(()=>{
                    this.jump = 0
                    this.skill = 0
                    if(this.hurted == 0)
                        this.move(this.walkspeed) //恢复控制
                    this.mySprite.vx = 0
                })
                this.clearcombo()
            }
        }

        rightdown(){
            if (this.jump != 0 || (this.attack | this.hurted) != 0
                || this.leftDOWN == 1 || this.leftDOWN == -1) {
                if(this.attack == 0){
                    this.laspres = 2
                }
                this.rightDOWN = 1
                clearTimeout(this.comboclock)
                this.comboclock = -1
                this.clearcombo(300)
                return
            }
            if (this.rush == 1) {
                if (this.mySprite.vx > 0) {
                    return
                }
                this.stand(true)
                this.mySprite.vx = 0
                this.skill = 0
            }
            else if(this.skill == 0){
                this.skill = 8
            }
            else if(this.skill == 1 || this.skill == 10){
                this.skill = 9
            }
            clearTimeout(this.comboclock)
            this.comboclock = -1
            this.laspres = 2
            if (this.combo == 1 && this.laspres == 2 && this.rightDOWN == 2 && this.defence != 1) {
                this.stop()
                this.mySprite.vx = this.rushspeed
                this.rush = 1
                this.skill = 4
                this.rightDOWN = 3
            }
            if(this.rightDOWN == 0){
                this.rightDOWN = 1
                this.clearcombo(this.defence == 0 ? 300 : 500)
            }
        }
        rightup(){
            if((this.leftDOWN == 1 || this.leftDOWN == -1) && this.attack == 0){
                this.laspres = 1
            }
            if(this.rightDOWN == 3){
                this.rightDOWN = this.rush == 1 ? 5 : 0
            }
            else if (this.rightDOWN == 1 || this.rightDOWN == -1 || this.rightDOWN == 2) {
                clearTimeout(this.comboclock)
                this.comboclock = -1
                this.clearcombo(300)
                if(this.skill == 8){
                    this.skill = 0
                }
                else if(this.skill == 9){
                    this.skill = 10
                }
                this.rightDOWN = this.rightDOWN == 1  ? 2 : 0
            }
        }
        leftdown(){
            if (this.jump != 0 || (this.attack | this.hurted) != 0 
                || this.rightDOWN == 1 || this.rightDOWN == -1) {
                if(this.attack == 0){
                    this.laspres = 1
                }
                this.leftDOWN = 1
                clearTimeout(this.comboclock)
                this.comboclock = -1
                this.clearcombo(300)
                return
            }
            if (this.rush == 1) {
                if (this.mySprite.vx < 0) {
                    return
                }
                this.stand(true)
                this.mySprite.vx = 0
                this.skill = 0
            }
            else if(this.skill == 0){
                this.skill = 8
            }
            else if(this.skill == 1 || this.skill == 10){
                this.skill = 9
            }
            this.laspres = 1
            clearTimeout(this.comboclock)
            this.comboclock = -1
            if (this.combo == 1 && this.laspres == 1 && this.leftDOWN == 2 && this.defence != 1) {
                this.stop()
                this.mySprite.vx = 0 - this.rushspeed
                this.rush = 1
                this.skill = 4
                this.leftDOWN = 3
            }
            if(this.leftDOWN == 0){
                this.leftDOWN = 1
                this.clearcombo(this.defence == 0 ? 300 : 500)
            }
        }
        //                        |->timeout(0)
        // 0 -> leftdown(1) -> leftup(2) -> leftdown(3.rush) -> leftup(5.rush)
        //        |->timeout(-1) -> leftup(0)
        leftup(){
            if((this.rightDOWN == 1 || this.rightDOWN == -1) && this.attack == 0){
                this.laspres = 2
            }
            if(this.leftDOWN == 3){
                this.leftDOWN = this.rush == 1 ? 5 : 0
            }
            else if (this.leftDOWN == 1 || this.leftDOWN == -1 || this.leftDOWN == 2) {
                clearTimeout(this.comboclock)
                this.comboclock = -1
                this.clearcombo(300)
                if(this.skill == 8){
                    this.skill = 0
                }
                else if(this.skill == 9){
                    this.skill = 10
                }
                this.leftDOWN = this.leftDOWN == 1  ? 2 : 0
            }
        }
        clearcombo (t = 500) {
            // 连击准备，t ms后清除
            this.combo = 1
            this.comboclock = setTimeout(()=>{
                this.comboclock = -1
                this.combo = 0
                if(this.skill == 9 || this.skill == 10){
                    this.skill = this.defence == 1 ? 1 : 0
                }
                else if(this.skill == 8){
                    this.skill = 0
                }
                this.leftDOWN = (this.leftDOWN == 1 || this.leftDOWN == -1) ? -1 : 0
                this.rightDOWN = (this.rightDOWN == 1 || this.rightDOWN == -1) ? -1 : 0
            }, t)
        }
    //=================== 初始化 ===================
        statusbar: StatusBarSprite
        mpbar: StatusBarSprite
        constructor(public mySprite: Sprite, public player: controller.Controller, public bulletkind: number){
            if(player == controller.player1){
                this.laspres = 2
            }
            else{
                this.laspres = 1
            }
            this.mySprite.setFlag(SpriteFlag.Ghost, true)
            this.mySprite.setFlag(SpriteFlag.Invisible, true);
            (<wave>(this.mySprite)).own = this
            this.statusbar = statusbars.create(50, 4, StatusBarKind.Health)
            this.statusbar.positionDirection(CollisionDirection.Top)
            this.statusbar.setOffsetPadding(-66666, 0)
            this.mpbar = statusbars.create(50, 4, StatusBarKind.Health)
            this.mpbar.setColor(9, 5)
            this.mpbar.positionDirection(CollisionDirection.Top)
            this.mpbar.setOffsetPadding(-66666, 3)
            this.standard = this.mySprite.image.clone()
            this.rstandard = this.mySprite.image.clone()
            this.rstandard.flipX()
        }
        walkInterval = 200
        startusbarsOffset = 53
        startcontroll(){
            this.mySprite.setFlag(SpriteFlag.Ghost, false)
            this.mySprite.setFlag(SpriteFlag.Invisible, false)
            this.statusbar.setOffsetPadding(this.startusbarsOffset, 0)
            this.mpbar.setOffsetPadding(this.startusbarsOffset, 0)
            let f = -1 //0: right, 1: left, -1: stop, -2: stop-left-anim, -3: stop-right-anim
            let wimg = <Image[]>[]
            for(let i = 0; i < this.walkimg.length; ++i){
                wimg.push(this.walkimg[i].clone())
                wimg[i].flipX()
            }
            setInterval(()=>{
                this.mpbar.value = Math.min(100, this.mpbar.value+100/Math.max(10, this.hp))
            }, 500)
            // setInterval(()=>{
            //     if(this.player == controller.player1)
            //     {
            //         console.log(this.attachBullet.length)
            //     }
            // }, 100)
            game.onUpdate(function() {
                if( (this.rightDOWN&1) == 1
                    && (this.hurted | this.jump | this.defence | this.attack) == 0){
                    if(f != 0){
                        f = 0
                        animation.stopAnimation(animation.AnimationTypes.All, this.mySprite)
                        animation.runImageAnimation(this.mySprite, this.walkimg, this.rush == 1 ? this.walkInterval*0.7 : this.walkInterval, true)
                    }
                }
                else if((this.leftDOWN&1) == 1 
                        && (this.hurted | this.jump | this.defence | this.attack) == 0){
                    if(f != 1){
                        f = 1
                        animation.stopAnimation(animation.AnimationTypes.All, this.mySprite)
                        animation.runImageAnimation(this.mySprite, wimg, this.rush == 1 ? this.walkInterval*0.7 : this.walkInterval, true)
                    }
                }
                else{
                    if((this.hurted | this.attack | this.defence | this.jump) == 0){
                        if(this.laspres == 1){
                            if(this.standards != null){
                                if(f != -2){
                                    f = -2
                                    animation.stopAnimation(animation.AnimationTypes.All, this.mySprite)
                                    animation.runImageAnimation(this.mySprite, this.rstandards, this.rush == 1 ? this.walkInterval*0.7 : this.walkInterval, true)
                                }
                            }
                            else this.mySprite.setImage(this.rstandard)
                        } 
                        else {
                            if(this.standards != null){
                                if(f != -3){
                                    f = -3
                                    animation.stopAnimation(animation.AnimationTypes.All, this.mySprite)
                                    animation.runImageAnimation(this.mySprite, this.standards, this.rush == 1 ? this.walkInterval*0.7 : this.walkInterval, true)
                                }
                            }
                            else this.mySprite.setImage(this.standard)
                        }
                    }
                    else f = -1
                    if(f >= 0){
                        animation.stopAnimation(animation.AnimationTypes.All, this.mySprite)
                        f = -1
                    }
                }
            })

            this.player.onButtonEvent(ControllerButton.Down, ControllerButtonEvent.Pressed, function () {
                this.downdown()
            })
            this.player.onButtonEvent(ControllerButton.Down, ControllerButtonEvent.Released, function () {
                this.downup()
            })
            this.player.onButtonEvent(ControllerButton.Up, ControllerButtonEvent.Pressed, function () {
                this.updown()
            })
            this.player.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
                this.leftdown()
            })
            this.player.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
                this.Adown()
            })
            this.player.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
                this.rightdown()
            })
            this.player.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Released, function () {
                this.leftup()
            })
            this.player.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
                this.Bdown()
            })
            this.player.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Released, function () {
                this.rightup()
            })
            this.player.moveSprite(this.mySprite, this.walkspeed, 0)
        }
    }

    function shoot(p: Character, beginAngel: number, endAngel: number, n: number, speed: number, 
        x: number, y: number, img: Image, 
            handle: (sprite: wave)=>void){
        let offset = Math.max(1, (endAngel-beginAngel)/n)
        beginAngel = (180+beginAngel)// % 360
        endAngel = (180+endAngel)// % 360
        for(let index = beginAngel; index <= endAngel; index += offset)
        {
            let bullet = <wave>sprites.createProjectileFromSide(img.clone(), 0, 0)
            reset(p, bullet)
            bullet.setPosition(x, y)
            bullet.setVelocity(speed*Math.cos(index/57.3), speed*Math.sin(index/57.3))
            if(p.laspres == 1){
                bullet.vx = -bullet.vx
                bullet.image.flipX()
            }
            bullet.setKind(p.bulletkind)
            handle(bullet)
        }
    }

//=================== 技能设置 ===================
    //------------ 临时变量 ------------
    export class tempVarDic{
        map: { [key: string]: number; }
        map2: {[key: string]: wave; }
        constructor(){
            this.map = {}
            this.map2 = {}
        }
    }

    //%block
    //%group="技能设置"
    //%blockId=getTempVar block="获取临时变量 %t=variables_get(tempVar) %key"
    //%weight=89
    export function getVal(tempVar: tempVarDic, key: string){
        return tempVar.map[key]
    }

    //%block
    //%group="技能设置"
    //%blockId=addTempVar block="设置临时变量 %t=variables_get(tempVar) %key = %val"
    //%weight=89
    export function add(tempVar: tempVarDic, key: string, val: number){
        tempVar.map[key] = val
    }

    //%block
    //%group="技能设置"
    //%blockId=getTempVar2 block="获取临时弹射物 %t=variables_get(tempVar) %key"
    //%weight=88
    export function getVal2(tempVar: tempVarDic, key: string){
        return tempVar.map2[key]
    }

    //%block
    //%group="技能设置"
    //%blockId=addTempVar2 block="设置临时弹射物 %t=variables_get(tempVar) %key 为 %val=variables_get(projectile)"
    //%weight=88
    export function add2(tempVar: tempVarDic, key: string, val: wave){
        tempVar.map2[key] = val
    }

    //%block
    //%group="技能设置"
    //%blockId=updateTempVar block="以幅度 %val 修改临时变量 %t=variables_get(tempVar) %key"
    //%weight=89
    export function updateVar(val: number, tempVar: tempVarDic, key: string, ){
        tempVar.map[key] += val
    }

    export let tempVar = new tempVarDic()
    //------------ 临时变量end ------------

    //%block
    //%group="技能设置"
    //%afterOnStart=true
    //%blockId=setSkill block="设置技能 %player=variables_get(player) %str=SkillKind 消耗mp %mp"
    //%str.defl=SkillKind.A mp.defl=0
    //%weight=90
    //%topblock=false
    //%handlerStatement=true
    //%draggableParameters="tempVar player"
    export function setSkill(player: Character, str: SkillKind, mp: number, skill: (tempVar: tempVarDic, player: Character)=>void){
        if(str == SkillKind.A){ //平A: A
            player.skill0A = {f:skill, mp:mp}
        }else if(str == SkillKind.A1){ //反击: ⬇️+A
            player.skill1A = {f:skill, mp:mp}
        }else if(str == SkillKind.A2){ //跳起攻击: ⬆️+A
            player.skill2A = {f:skill, mp:mp}
        }else if(str == SkillKind.A3){ //跳起特殊攻击: ⬇️+⬆️+A
            player.skill3A = {f:skill, mp:mp}
        }else if(str == SkillKind.A4){ //冲刺: ➡️➡️+A
            player.skill4A = {f:skill, mp:mp}
        }else if(str == SkillKind.A6){ //冲跳攻: ➡️➡️+⬆️+A
            player.skill6A = {f:skill, mp:mp}
        }else if(str == SkillKind.A8){ //平A2: ➡️+A
            player.skill8A = {f:skill, mp:mp}
        }else if(str == SkillKind.A9){ //反击2: ↘️+A
            player.skill9A = {f:skill, mp:mp}
        }else if(str == SkillKind.A10){ //必杀: ⬇️+➡️+A
            player.skill10A = {f:skill, mp:mp}
        }else if(str == SkillKind.B){ //平A: B
            player.skill0B = {f:skill, mp:mp}
        }else if(str == SkillKind.B1){ //反击: ⬇️+B
            player.skill1B = {f:skill, mp:mp}
        }else if(str == SkillKind.B2){ //跳起攻击: ⬆️+B
            player.skill2B = {f:skill, mp:mp}
        }else if(str == SkillKind.B3){ //跳起特殊攻击: ⬇️+⬆️+B
            player.skill3B = {f:skill, mp:mp}
        }else if(str == SkillKind.B4){ //冲刺: ➡️➡️+B
            player.skill4B = {f:skill, mp:mp}
        }else if(str == SkillKind.B6){ //冲跳攻: ➡️➡️+⬆️+B
            player.skill6B = {f:skill, mp:mp}
        }else if(str == SkillKind.B8){ //平A2: ➡️+B
            player.skill8B = {f:skill, mp:mp}
        }else if(str == SkillKind.B9){ //反击2: ↘️+B
            player.skill9B = {f:skill, mp:mp}
        }else if(str == SkillKind.B10){ //必杀: ⬇️+➡️+B
            player.skill10B = {f:skill, mp:mp}
        }
    }

    //默认技能
    //%block
    //%group="技能设置"
    //%blockId=defaultSkill block="使用默认技能 %player=variables_get(player)"
    //%str.defl=SkillKind.A
    export function defalutSkill(player: Character){
        player.defaultskill()
    }

    //------------ promise ------------
    interface TimeAction {
        delay:number,
        callback: ((sprite: wave) =>void)
    }

    class Request {
        callbacks : TimeAction[] ;
        sprite: wave;
        constructor(sprite: wave) {
            this.sprite = sprite
            this.callbacks = []
        }

        pushCb(delay:number, cb : (sprite: wave) =>void) {
            this.callbacks.push({delay:delay, callback:cb})
        }

        pop() : TimeAction {
            return this.callbacks.removeAt(0)
        }

        isEmpty () :boolean {
            return this.callbacks.length == 0
        }
    }

    //% blockId=cbpromisethen block="after %delay s then" 
    //% topblock=false
    //% group="自定义弹射物"
    //% handlerStatement=true
    //% draggableParameters="reporter"
    //% weight=79
    export function then(delay:number, cb:(projectile: wave) => void ) {
        currentRequest.pushCb(delay*1000, cb)
    }

    //% blockId=cbpromiseinvoke block="invoke" 
    //% group="自定义弹射物"
    function invoke() {
        const _currentRequest = currentRequest
        control.runInParallel(() => {
            while (!_currentRequest.isEmpty()) {
                let timeAction = _currentRequest.pop()
                pause(timeAction.delay)
                timeAction.callback(_currentRequest.sprite)
            }
        })
    }

    let currentRequest:Request = null;
    
//=================== 弹射物 ===================

    export class myProjectile{
        img: Image
        cb: (projectile: wave)=>void
        constructor(){
            this.img = img`
                .
            `
            this.cb = ()=>{}
        }
    }

    let projectiles: { [key: string]: myProjectile; } = {}

    //%block
    //%group="自定义弹射物"
    //%blockId=setProjectiles block="自定义弹射物集合 标记名为%name"
    //%weight=100
    //%afterOnStart=true
    export function setProjectiles(name:string, cb:()=>void){
        cb()
    }

    //%block
    //%group="自定义弹射物"
    //%blockId=strProjectiles block="弹射物名称 %name"
    //%weight=98
    //%blockSetVariable=projectileName
    export function strProjectiles(name: string){
        return name
    }

    //%block
    //%group="自定义弹射物"
    //%blockId=setProjectile block="设置弹射物 %img=screen_image_picker 命名为%name"
    //%weight=81
    //%inlineInputMode=inline
    //%draggableParameters="projectile"
    //% topblock=false
    //% handlerStatement=true
    //%afterOnStart=true
    export function setProjectile(img: Image, name:string, cb:(projectile: wave)=>void){
        if(projectiles[name] != undefined){
            console.log("定义弹射物时发生弹射物命名冲突："+name)
        }
        let bullet = new myProjectile
        bullet.img = img
        bullet.cb = cb;
        //projectiles.push({p:bullet, name:name})
        projectiles[name] = bullet
    }

    //%block
    //%group="技能设置"
    //%blockId=shoot2 block="%p=variables_get(player) 发射弹射物 %name 从x $x y $y ||朝向角度 $a 速率 $s 与发射点到距离 $d"
    //%a.defl=180 s.defl=50 x.defl=0 y.defl=0  d.defl=0
    //%weight=81
    //%inlineInputMode=inline
    export function shoot2(p: Character, name: string, x: number, y: number, 
        a: number = 180, s: number = 50, d: number = 0){
        let bullet: wave
        let func: (projectile: wave)=>void
        if(projectiles[name] == undefined){
            console.log("发射的弹射物 '"+name+"' 未定义!")
        }
        bullet = <wave>sprites.createProjectileFromSide(projectiles[name].img.clone(), 0, 0)
        func = projectiles[name].cb
        reset(p, bullet)
        a+=180
        if(p.laspres == 1){
            a = 180-a
        }
        bullet.setPosition(x+d*Math.cos(a/57.3), y+d*Math.sin(a/57.3))
        bullet.setVelocity(s*Math.cos(a/57.3), s*Math.sin(a/57.3))
        if(bullet.vx < 0 || bullet.vx == 0 && p.laspres == 1){
            //bullet.vx = -bullet.vx
            bullet.image.flipX()
            bullet.dir = 1
        }
        bullet.setKind(p.bulletkind)
        currentRequest = new Request(bullet)
        func(bullet)
        invoke()
    }

    //%block
    //%group="自定义弹射物"
    //%blockId=splitshoot block="(空爆) %p=variables_get(projectile) 射出 %name || 偏移x %x y %y朝向角度 $a 速率 $s 与发射点到距离 $d"
    //%a.defl=180 x.defl=0 y.defl=0 s.defl=50 d.defl=0
    //%weight=78
    //%inlineInputMode=inline
    //% topblock=false
    //% handlerStatement=true
    export function splitshoot(p: wave, name: string, x: number = 0, y: number = 0,  
        a: number = 180, s: number = 50, d: number = 0){
        if(!p.isDestroyed){
            let bullet: wave
            let func: (projectile: wave)=>void
            if(projectiles[name] == undefined){
                console.log("空爆的弹射物 '"+name+"' 未定义!")
            }
            bullet = <wave>sprites.createProjectileFromSide(projectiles[name].img.clone(), 0, 0)
            func = projectiles[name].cb
            reset(p.own, bullet)
            a+=180
            if(p.dir == 1){
                a = 180-a
            }
            bullet.setPosition(p.x+d*Math.cos(a/57.3)+x, p.y+d*Math.sin(a/57.3)+y)
            bullet.setVelocity(s*Math.cos(a/57.3), s*Math.sin(a/57.3))
            if(bullet.vx < 0 || bullet.vx == 0 && p.dir == 1){
                //bullet.vx = -bullet.vx
                bullet.image.flipX()
                bullet.dir = 1
            }
            bullet.setKind(p.kind())
            currentRequest = new Request(bullet)
            func(bullet)
            invoke()
        }
    }

    //%block
    //%group="自定义弹射物"
    //%blockId=tailshoot block="(尾焰) %p=variables_get(projectile) 每隔%t ms 产生尾焰 %img=screen_image_picker 生命周期 %life ms"
    //%t.defl=100 life.defl=500 d.defl=0
    //%weight=77
    //%inlineInputMode=inline
    //% topblock=false
    //% handlerStatement=true
    export function tailshoot(p: wave, t: number,  img: Image, life: number, cb:()=>void){
        let clock: number
        clock = setInterval(function() {
            if(!p.isDestroyed){
                let bullet = <wave>sprites.createProjectileFromSide(img.clone(), 0, 0)
                reset(p.own, bullet)
                bullet.setPosition(p.x, p.y)
                bullet.lifespan = life
                bullet.damage = 0
                bullet.indeflectible = true
                bullet.perishTogether = false
                bullet.hurted = 0
                bullet.hitrec = 0
                if(p.dir == 1){
                    bullet.image.flipX()
                    bullet.dir = 1
                }
                bullet.setKind(p.kind())
                currentRequest = new Request(bullet)
                cb()
                invoke()
            }
            else {
                clearInterval(clock)
            }
        }, t)
    }

    //% blockId=overlapAct block="(地雷) %p=variables_get(projectile) 被 %k=overlapKind 触碰后" 
    //% topblock=false
    //% group="自定义弹射物"
    //% handlerStatement=true
    //% k.defl=overlapKind.three
    //% draggableParameters="reporter"
    //% weight=76
    export function overlapAct(p: wave, k: overlapKind, func: () => void ) {
        if(k == overlapKind.one){
            p.overlapKind = 1
        }
        else if(k == overlapKind.two){
            p.overlapKind = 2
        }
        else if(k == overlapKind.three){
            p.overlapKind = 3
        }
        p.overlapAct = func
    }

    //% blockId=bulletInterval block="每隔%t 秒 持续执行 直到 %p=variables_get(projectile) 消亡" 
    //% topblock=false
    //% group="自定义弹射物"
    //% handlerStatement=true
    //% draggableParameters="reporter"
    //% weight=75
    export function bulletInterval(t: number, p: wave, func: () => void) {
        let clock: number
        clock = setInterval(()=>{
            if(p.isDestroyed){
                clearInterval(clock)
            }
            else{
                func()
            }
        }, t*1000)
    }

    //%block
    //%group="自定义弹射物"
    //%blockId=setBullet block="设置弹射物%b=variables_get(projectile) 属性 %k=bulletP 为 %v"
    //%v.defl=0
    //%weight=78
    export function setBullet(b:wave, k: bulletP, v: number){
        if(k == bulletP.damage){
            b.damage = v
        }
        else if(k == bulletP.hitrec){
            b.hitrec = v
        }
        else if(k == bulletP.hurted){
            b.hurted = v
        }
        else if(k == bulletP.xspeed){
            b.xspeed = v
        }
        else if(k == bulletP.yspeed){
            b.yspeed = v
        }
    }

    //%block
    //%group="自定义弹射物"
    //%blockId=setBullet2 block="设置弹射物%b=variables_get(projectile) 特殊效果 %k=bulletP2 为 %v"
    //%v.defl=true
    //%weight=78
    export function setBullet2(b:wave, k: bulletP2, v: boolean){
        if(k == bulletP2.breakdef){
            b.breakdef = v
        }
        else if(k == bulletP2.rebound){
            b.rebound = v
        }
        else if(k == bulletP2.indeflectible){
            b.indeflectible = v
        }
        else if(k == bulletP2.perishTogether){
            b.perishTogether = v
        }
        else if(k == bulletP2.attachPlayer){
            b.attachOwner = v
            if(v){
                b.own.attachBullet.push(b)
            }
            else {
                for(let i = 0; i < b.own.attachBullet.length; ++i){
                    if(b.own.attachBullet[i] == b){
                        b.own.attachBullet.removeAt(i)
                        break
                    }
                }
            }
        }
    }

    // 自机狙
    //%group="自定义弹射物"
    //%blockId=aimedshot block="(自机狙) %bullet=variables_get(projectile) 转向敌方 ||转向速率 %time"
    //%time.defl=573
    export function aimedshot(bullet: wave, time: number = 573){
        let x: number = bullet.own.enemySprite.x
        let y: number = bullet.own.enemySprite.y
        if(bullet.own.bulletkind == bullet.kind()){
            x = bullet.own.enemySprite.x
            y = bullet.own.enemySprite.y
        }
        else{
            x = bullet.own.mySprite.x
            y = bullet.own.mySprite.y
        }
        let angel = Math.atan2(y-bullet.y, x-bullet.x)
        let speed = Math.sqrt(bullet.vx*bullet.vx+bullet.vy*bullet.vy)
        let angel0 = Math.atan2(bullet.vy, bullet.vx)
        time = Math.min(time, 1146)
        let clock: number
        clock = setInterval(()=>{
            if(Math.abs(angel-angel0 )<= 1/57.3)
            {
                angel0 = Math.atan2(y-bullet.y, x-bullet.x)
                clearInterval(clock)
            }
            else{
                angel0 += (angel-angel0)*time/573/2
            }
            bullet.setVelocity(speed*Math.cos(angel0),speed*Math.sin(angel0))
        }, 0)
    }

    export enum clockwise{
        //% block="顺"
        p,
        //% block="逆"
        n
    }


    //%block
    //%group="自定义弹射物"
    //%blockId=turnTo block="偏移 %p=variables_get(projectile) 转向角度 %angel ||速率%v"
    //%angel.defl=0 v.defl=1146
    //%inlineInputMode=inline
    export function turnTo(sprite: Sprite, angel: number, v: number = 1146){
        let speed = Math.sqrt(sprite.vx*sprite.vx+sprite.vy*sprite.vy)
        angel = (angel+180)/57.3
        let angel0 = Math.atan2(sprite.vy, sprite.vx)
        v = Math.min(v, 1146)
        let clock: number
        clock = setInterval(()=>{
            if(Math.abs(angel-angel0)%(2*Math.PI)<= 1/57.3)
            {
                angel0 = angel
                clearInterval(clock)
            }
            else{
                angel0 += (angel-angel0)*v/573/2
            }
            sprite.setVelocity(speed*Math.cos(angel0),speed*Math.sin(angel0))
        }, 0)
    }

    //%block
    //%group="自定义弹射物"
    //%blockId=stopcircular block="停止转圈 %p=variables_get(projectile)"
    export function stopcircular(sprite: Sprite){
        clearInterval((<wave>sprite).circlock);
        (<wave>sprite).circlock = -1
    }

    //%block
    //%group="自定义弹射物"
    //%blockId=circular block="转圈 %p=variables_get(projectile) ||半径%r 半径递增速率%v %t 时针 偏移速率%ov 偏移角度%oa"
    //%r.defl=30 v=0 t.defl=clockwise.p ov.defl=0 oa.defl=180
    //%inlineInputMode=inline
    export function circular(sprite: Sprite, r: number = 30, v: number = 0, 
    t: clockwise = clockwise.p, ov: number = 0, oa: number = 180){
        let speed = Math.max(Math.sqrt(sprite.vx*sprite.vx+sprite.vy*sprite.vy), 10)
        let angel0 = Math.atan2(sprite.vy, sprite.vx)
        //r = Math.max(r, 0)
        oa = (oa+180)/57.3
        let vx = ov*Math.cos(oa)
        let vy = ov*Math.sin(oa)
        if((<wave>sprite).dir == 2 && t == clockwise.n || (<wave>sprite).dir == 1 && t == clockwise.p){
            r = -r
            v = -v
        }
        if((<wave>sprite).dir == 1){
            vx = -vx
        }
        let dir = (<wave>sprite).dir;
        (<wave>sprite).circlock = setInterval(()=>{
            if((<wave>sprite).isDestroyed){
                clearInterval((<wave>sprite).circlock);
                (<wave>sprite).circlock = -1
            }
            else if(dir != (<wave>sprite).dir){
                r = -r
                v = -v
                vx = -vx
                dir = (<wave>sprite).dir
            }
            angel0 = (angel0+1/r)%(2*Math.PI)
            r+=v/57.3
            sprite.setVelocity(speed*Math.cos(angel0) + vx,speed*Math.sin(angel0) + vy)
        }, 0)
    }

    //%block
    //%group="自定义弹射物"
    //%blockId=movetoxy block="移动 %sprite=variables_get(projectile) 在%time 秒内接近 位置x %desx y %desy"
    //%inlineInputMode=inline
    export function movetoxy (sprite: Sprite, time: number, desx: number, desy: number) {
        movetox(sprite, time, desx)
        movetoy(sprite, time, desy)
    }

    //%block
    //%group="自定义弹射物"
    //%blockId=movetox block="移动 %sprite=variables_get(projectile) 在%time 秒内接近 位置x %desx"
    //%inlineInputMode=inline
    export function movetox (sprite: Sprite, time: number, desx: number) {
        let clock: number
        clock = setInterval(()=>{
            sprite.vx = 4 * (desx - sprite.x) / time
            if(Math.abs(desx - sprite.x) < 0.5){
                sprite.vx = 0
                clearInterval(clock)
            }
        }, 0)
    }

    //%block
    //%group="自定义弹射物"
    //%blockId=movetoy block="移动 %sprite=variables_get(projectile) 在%time 秒内接近 位置y %desy"
    //%inlineInputMode=inline
    export function movetoy (sprite: Sprite, time: number, desy: number) {
        let clock: number
        clock = setInterval(()=>{
            sprite.vy = 4 * (desy - sprite.y) / time
            if(Math.abs(desy - sprite.y) < 0.5){
                sprite.vy = 0
                clearInterval(clock)
            }
        }, 0)
    }

    //%block
    //%group="自定义弹射物"
    //%blockId=movexy block="移动 %sprite=variables_get(projectile) 在%time 秒内移动 x %dx y %dy"
    //%inlineInputMode=inline
    export function movexy (sprite: Sprite, time: number, dx: number, dy: number) {
        if(dx != 0){
            movetox(sprite, time, sprite.x+dx)
        }
        if(dy != 0){
            movetoy(sprite, time, sprite.y+dy)
        }
    }

    //%block
    //%group="自定义弹射物"
    //%blockId=accelerateToV block="加速 %sprite=variables_get(projectile) 在%time 秒内加速到 vx %dx vy %dy"
    //%inlineInputMode=inline
    export function acceToV (sprite: Sprite, time: number, vx: number, vy: number) {
        vx = ((sprite.vx+1)^vx)<0 ? -vx : vx
        vy = ((sprite.vy+1)^vy)<0 ? -vy : vy
        let ay = sprite.ay
        let clock = setInterval(()=>{
            sprite.ax = 4*(vx-sprite.vx)/time
            sprite.ay = 4*(vy-sprite.vy)/time
        }, 0)
        setTimeout(()=>{
            clearInterval(clock)
            sprite.setVelocity(vx, vy)
            sprite.ax = 0
            sprite.ay = ay
        }, time*1000)
    }
    
    // 反击，防御状态被攻击才能发出
    //%group="技能设置"
    //%blockId=counterAttack block="(反击) %p=variables_get(player) 尝试执行 消耗mp %mp"
    //%mp.defl=0
    //% topblock=false
    //% handlerStatement=true
    export function counterAttack(p: Character, mp: number = 0, func: ()=>void){
        p.counterAttack(mp, func)
    }

    // 自动攻击，暂停控制，按[下]退出
    //%group="技能设置"
    //%blockId=autoAttack block="(持续攻击) %p=variables_get(player) 每隔 %time 秒自动执行 消耗mp %mp"
    //%time.defl=0 mp.defl=0
    //%inlineInputMode=inline
    //% topblock=false
    //% handlerStatement=true
    export function autoAttack(p: Character, time: number, mp: number, func:()=>void){
        p.autoAttack(time*1000, mp, func)
    }

//=================== 人物动作 ===================
    //%block
    //%group="人物动作"
    //%blockId=attackAction block="攻击 %p=variables_get(player) %atk=atkKind ||持续 $time 秒"
    //%time.defl = 0
    //%inlineInputMode=inline
    //%weight=99
    export function atkAction(p:Character, atk: atkKind, time: number = 0){
        if(atk == atkKind.BasicAtkA){
            if(time == 0){
                p.basicAttack('A')
            }
            else{
                p.basicAttack('A', time*1000)
            }
        }
        else if(atk == atkKind.RushAtkA){
            if(time == 0){
                p.rushAttack('A')
            }
            else{
                p.rushAttack('A', time*1000)
            }
        }
        else if(atk == atkKind.BasicAtkB){
            if(time == 0){
                p.basicAttack('B')
            }
            else{
                p.basicAttack('B', time*1000)
            }
        }
        else if(atk == atkKind.RushAtkB){
            if(time == 0){
                p.rushAttack('B')
            }
            else{
                p.rushAttack('B', time*1000)
            }
        }
    }

    //%block
    //%group="人物动作"
    //%blockId=jump block="起跳 %p=variables_get(player) ||竖直速度%vy 水平速度%vx"
    //%vy.defl=100 vx.defl=0
    //%weight=98
    export function jump(p: Character, vy: number = 100, vx: number = 0){
        // p.updown();
        p.jump = 1
        p.stop()
        if (p.laspres == 1) {
            p.mySprite.vx = -vx
        } else {
            p.mySprite.vx = vx
        }
        p.mySprite.vy = -vy
        p.toground(()=>{
            p.jump = 0
            p.skill = 0
            if(p.hurted == 0)
                p.move(p.walkspeed) //恢复控制
            p.mySprite.vx = 0
        })
    }

    //%block
    //%group="人物动作"
    //%blockId=run block="起跑 %p=variables_get(player) ||速度%speed"
    //%weighr=98
    //%speed.defl=80
    export function run(p: Character, speed: number = 80){
        p.stop()
        p.rush = 1
        p.skill = 4
        if(p.laspres == 1){
            p.leftDOWN = 3
            p.rightDOWN = 0
            p.mySprite.vx = -speed
        }
        else{
            p.rightDOWN = 3
            p.leftDOWN = 0
            p.mySprite.vx = speed
        }
        // if(p.laspres == 1){
        //     p.leftdown()
        //     p.leftup()
        //     p.leftdown()
        //     p.leftup()
        // }
        // else{
        //     p.rightdown()
        //     p.rightup()
        //     p.rightdown()
        //     p.rightup()
        // }
    }

    //%group="人物动作"
    //%blockId=stop block="暂停控制 %p=variables_get(player) %time 秒"
    //%weighr=96
    //%speed.defl=1
    export function stop(p: Character, time: number = 1){
        p.stop()
        p.attack = 1
        setTimeout(function() {
            p.attack = 0
            p.move(p.walkspeed)
        }, time*1000)
    }

    //%block
    //%group="人物动作"
    //%blockId=defent block="防御 %p=variables_get(player) %t 秒 ||防御系数 %k"
    //%t.defl=1 
    //%k.defl=0.5
    //%weighr=98
    export function defent(p: Character, t: number, k: number = 0.5){
        p.def2 = k
        clearTimeout(p.def2clock)
        p.def2clock = setTimeout(()=>{p.def2clock = -1; p.def2=1; }, t*1000)
    }

    //%block
    //%group="人物动作"
    //%blockId=newPosture block="近身攻击 %p=variables_get(player) 摆出姿势 %img=screen_image_picker %t 秒 攻击部位(projectile) %atk=screen_image_picker "
    //%inlineInputMode=inline
    //%t.defl=0.3
    //%weight=97
    //%blockSetVariable="projectile"
    export function newPosture(p: Character, img: Image, t: number = 0.3, atk: Image){
        if(p.hurted > 0){
            let ret = <wave>sprites.createProjectileFromSprite(img, p.mySprite, p.mySprite.vx, 0)
            reset(p, ret)
            ret.lifespan = 0
            return ret
        }
        p.attack = 1
        p.defence = 0
        p.mySprite.setImage(img.clone())
        p.stop()
        let projectile = p.attackPosture(atk, t*1000)
        projectile.indeflectible = true
        if (p.laspres == 1) {
            p.mySprite.image.flipX()
        }
        setTimeout(()=>{p.stand(true)}, t*1000)
        return projectile
    }

    //%block
    //%group="人物动作"
    //%blockId=turn block="%p=variables_get(player) 转向"
    //%weight=95
    export function turn(p: Character){
        if(p.laspres == 1){
            p.laspres = 2
        }
        else {
            p.laspres = 1
        }
        p.mySprite.vx = -p.mySprite.vx
        p.mySprite.image.flipX()
        p.leftDOWN ^= p.rightDOWN
        p.rightDOWN ^= p.leftDOWN
        p.leftDOWN ^= p.rightDOWN
    }

    //% block="延迟 $time 秒后执行"
    //% time.defl=0.5
    //%group="人物动作"
    //% handlerStatement=1
    //% %time=timePicker ms"
    export function after(time: number, thenDo: () => void) {
        setTimeout(thenDo, time*1000)
    }

//=================== 自定义人物 ===================

    //%block
    //%group="自定义人物"
    //%blockId=setPlayerStImage block="设置$p=variables_get(player) %k=stimgKind 姿势 $img=screen_image_picker"
    //%inlineInputMode=inline
    export function setStImage(p: Character, k: stimgKind, img: Image){
        if(k == stimgKind.Defence){
            p.defenceimg = img
        }
        else if(k == stimgKind.Hitover){
            p.hitover = img
        }
        else if(k == stimgKind.Lie){
            p.lieimg = img
        }
        else if(k == stimgKind.Stand){
            p.standard = img
            p.rstandard = img.clone()
            p.rstandard.flipX()
        }
        else if(k == stimgKind.Quickst){
            p.quickst = img
        }
    }
    //%block
    //%group="自定义人物"
    //%blockId=setPlayerAtkImage block="设置$p=variables_get(player) %k=atkimgKind 姿势 $img=screen_image_picker 攻击部位 %atk=screen_image_picker"
    //%inlineInputMode=inline
    export function setAtkImage(p: Character, k: atkimgKind, img: Image, atk: Image){
        if(k == atkimgKind.hand1)
        {
            p.attackA = img
            p.hand = atk
        }
        else if(k == atkimgKind.hand2)
        {
            p.rushA = img
            p.rushhand = atk
        }else if(k == atkimgKind.leg1)
        {
            p.attackB = img
            p.leg = atk
        }
        else if(k == atkimgKind.leg2)
        {
            p.rushB = img
            p.rushleg = atk
        }
    }

    //%block
    //%group="自定义人物"
    //%blockId=setPlayerWalkImage block="设置$p=variables_get(player) %k=aniKind $img=animation_editor ||走路帧间隔%t ms"
    //%inlineInputMode=inline
    //%t.defl=200
    export function setWalkImage(p: Character, k: aniKind, img: Image[], t: number = 200){
        p.walkInterval = t
        if(k == aniKind.Hurt)
        {
            p.hurtedimg = img
        }
        else if(k == aniKind.Walk){
            p.walkimg = img
        }
        else if(k == aniKind.Stand){
            p.standards = img
            p.rstandards = []
            for(let i of img){
                let timg = i.clone()
                timg.flipX()
                p.rstandards.push(timg)
            }
        }
    }

    //%block
    //%group="自定义人物"
    //%blockId=setAbility block="设置%p=variables_get(player) 属性 %k=abilityKind 为 %v"
    //%v.defl=0
    export function setAbility(p: Character, k: abilityKind, v: number){
        if(k == abilityKind.damageA){
            p.damageA = v
        }else if(k == abilityKind.damageB){
            p.damageB = v
        }else if(k == abilityKind.def){
            p.def = v
        }else if(k == abilityKind.defact){
            p.defact = v
        }else if(k == abilityKind.defencelas){
            p.defencelas = v
        }else if(k == abilityKind.downtime){
            p.downtime = v
        }else if(k == abilityKind.hitrecA){
            p.hitrecA = v
        }else if(k == abilityKind.hitrecB){
            p.hitrecB = v
        }else if(k == abilityKind.immutime){
            p.immutime = v
        }else if(k == abilityKind.jumpspeed){
            p.jumpspeed = v
        }else if(k == abilityKind.rushspeed){
            p.rushspeed = v
        }else if(k == abilityKind.walkspeed){
            p.walkspeed = v
        }
    }

    //%block
    //% group="人物参数"
    //%blockId=dirRight block="%p=variables_get(player) 朝向右"
    export function dirRight(p: Character): boolean{
        return p.laspres == 2
    }

}