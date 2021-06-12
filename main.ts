/*
namespace matchstickMen{
    export function f(){
        //复制以下内容到自己项目的main.ts
        myGame.basicSet(img`
    fff........fff..
    cbbcf......ccff.
    .cbbcf......ccff
    .cccbf......cfcf
    .ccbbcf.cc.ccfff
    .cbbcbfcc3cc3cff
    .cbccbfcb3cb3bff
    ..cccbbcbbbbbbc.
    ...ccccbb1bbb1c.
    ....ccbbbbbbbbbc
    ....fbbbbcbbbcbc
    ...cfbbbb1fff1bf
    ..ccfbbbbbbbbbbf
    ....fcbbbbbbbbf.
    .....fcbbbbbbf..
    ......fffffff...
    ................
    ................
    ................
    ................
    ................
    ................
            `, "未命名", function (player) {
            myGame.setAtkImage(player, myGame.atkimgKind.hand1, img`
                ...........fff..
                fff........ccfff
                cbbcf...cc.cccff
                .cbbbffcc3cc3cff
                .cccbbfcb3cb3cff
                .ccbcbfcbbbbbbcf
                .cbbcbbcb1bbb1cc
                .cbcccbbbbbbbbbc
                ..cccccbbc1ff1bc
                ...cfbbbbf1ff1fc
                ...cfbbbbfffffff
                ..ccfbbbbf2222ff
                ....fcbbb22222f.
                .....fcbbb222f..
                ......fffffff...
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                `, img`
                ........................................
                ........................................
                ..................................555...
                ..................................5.5...
                .................................5...5..
                ................................5.....5.
                ................................5.....5.
                ................................5.....5.
                ................................5.....5.
                ...............................5.......5
                ...............................5.......5
                ...............................5.......5
                ...............................5.......5
                ...............................5.......5
                ...............................5.......5
                ................................5.....5.
                ................................5.....5.
                ................................5.....5.
                ................................5.....5.
                .................................5...5..
                ..................................5.5...
                ..................................555...
                ........................................
                ........................................
                `)
            myGame.setAtkImage(player, myGame.atkimgKind.hand2, img`
                ...........fff..
                fff........ccfff
                cbbcf...cc.cccff
                .cbbbffcc3cc3cff
                .cccbbfcb3cb3cff
                .ccbcbfcbbbbbbcf
                .cbbcbbcb1bbb1cc
                .cbcccbbbbbbbbbc
                ..cccccbbc1ff1bc
                ...cfbbbbf1ff1fc
                ...cfbbbbfffffff
                ..ccfbbbbf2222ff
                ....fcbbb22222f.
                .....fcbbb222f..
                ......fffffff...
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                `, img`
                ........................................
                ........................................
                ..................................555...
                ..................................5.5...
                .................................5...5..
                ................................5..4..5.
                ................................5.4.4.5.
                ................................5.4.4.5.
                ................................5.4.4.5.
                ...............................5.4...4.5
                ...............................5.4...4.5
                ...............................5.4...4.5
                ...............................5.4...4.5
                ...............................5.4...4.5
                ...............................5.4...4.5
                ................................5.4.4.5.
                ................................5.4.4.5.
                ................................5.4.4.5.
                ................................5.4.4.5.
                .................................5.4.5..
                ..................................5.5...
                ..................................555...
                ........................................
                ........................................
                `)
            myGame.setAtkImage(player, myGame.atkimgKind.leg1, img`
                ...........fff..
                fff........ccfff
                cbbcf...cc.cccff
                .cbbbffcc3cc3cff
                .cccbbfcb3cb3cff
                .ccbcbfcbbbbbbcf
                .cbbcbbcb1bbb1cc
                .cbcccbbbbbbbbbc
                ..cccccbbc1ff1bc
                ...cfbbbbf1ff1fc
                ...cfbbbbfffffff
                ..ccfbbbbf2222ff
                ....fcbbb22222f.
                .....fcbbb222f..
                ......fffffff...
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                `, img`
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
                `)
            myGame.setAtkImage(player, myGame.atkimgKind.leg2, img`
                ...........fff..
                fff........ccfff
                cbbcf...cc.cccff
                .cbbbffcc3cc3cff
                .cccbbfcb3cb3cff
                .ccbcbfcbbbbbbcf
                .cbbcbbc22bb22cc
                .cbcccbbbbbbbbbc
                ..cccccbbc1ff1bc
                ...cfbbbbf1ff1fc
                ...cfbbbbfffffff
                ..ccfbbbbf2222ff
                ....fcbbb22222f.
                .....fcbbb222f..
                ......fffffff...
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                `, img`
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
                `)
            myGame.setStImage(player, myGame.stimgKind.Defence, img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . c c . . c c . . 
                . . . . . . c c c 3 c c 3 c . . 
                . . . . . c c c b 3 c b 3 b c . 
                . . . . f f b b b b b b b b c . 
                . . . . f f b b b b b b b b c c 
                . . . f f f c b b 1 b b b 1 b c 
                . . . f f f f b b b b b b b b c 
                . . . b b b c c b c b b b c b f 
                . . . c c c c f b 1 f f f 1 b f 
                . . . c c b b f b b b b b b f . 
                . . . c b b c c b b b b b f c c 
                . . c b b c c f f f f f f c c c 
                . c c c c c . . . . . . c c c . 
                c c c c . . . . . . . c c c . . 
                . . . . . . . . . . . . . . . . 
                `)
            myGame.setStImage(player, myGame.stimgKind.Hitover, img`
                ...fffffff......
                ..fbbbbbbcf.....
                .f2222bbbbcf....
                ff2222fbbbbfcc..
                ff1ff1fbbbbfc...
                cb1ff1cbbbbf....
                cbbbbbbbbbcc....
                .c1bbb1bbcccc...
                .c1bbb1bcbbccc..
                ffb3bc3bcfbccbc.
                ffc3cc3ccfbcbbc.
                fffcc.cc.fcbbcc.
                fcfc......fbccc.
                ffcc......fcbbc.
                .ffcc......fcbbc
                ..fff........fff
                ................
                ................
                ................
                ................
                `)
            myGame.setStImage(player, myGame.stimgKind.Lie, img`
                . . . . . . . . . . . . . . . . 
                . . c c c . . . . . . . c c c c 
                . c c c . . . . . . c c c c c . 
                c c c f f f f f f c c b b c . . 
                c c f b b b b b c c b b c . . . 
                . f b b b b b b f b b c c . . . 
                f b 1 f f f 1 b f c c c c . . . 
                f b c b b b c b c c b b b . . . 
                c b b b b b b b b f f f f . . . 
                c b 1 1 b b 1 1 b c f f f . . . 
                c c b b b b b b b b f f . . . . 
                . c b b b b b b b b f f . . . . 
                . c b 3 b c 3 b c c c . . . . . 
                . . c 3 c c 3 c c c . . . . . . 
                . . c c . . c c . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `)
            myGame.setStImage(player, myGame.stimgKind.Stand, img`
                fff........fff..
                cbbcf......ccff.
                .cbbcf......ccff
                .cccbf......cfcf
                .ccbbcf.cc.ccfff
                .cbbcbfcc3cc3cff
                .cbccbfcb3cb3bff
                ..cccbbcbbbbbbc.
                ...ccccbb1bbb1c.
                ....ccbbbbbbbbbc
                ....fbbbbcbbbcbc
                ...cfbbbb1fff1bf
                ..ccfbbbbbbbbbbf
                ....fcbbbbbbbbf.
                .....fcbbbbbbf..
                ......fffffff...
                ................
                ................
                ................
                ................
                ................
                ................
                `)
            myGame.setStImage(player, myGame.stimgKind.Quickst, img`
                . f f f . . . . . . . . f f f . 
                . c b b c f . . . . . . . c f f 
                . . c b b c f . . . . . . c c f 
                . . c c c b f . . . . . . . f c 
                . . c c b b f f . . . . . f f c 
                . . c b b c b f c c . c c f f f 
                . . c b c c b f c c c c c f f f 
                . . . c c c b c b 3 c c 3 c f . 
                . . . c c c c b b 3 c b 3 b c . 
                . . . . c c b b b b b b b b c c 
                . . . c f b b b 1 1 b b b 1 1 c 
                . . c c f b b b b b b b b b b f 
                . . . . f b b b b c b b b c b f 
                . . . . f c b b b 1 f f f 1 f . 
                . . . . . f c b b b b b b f . . 
                . . . . . . f f f f f f f . . . 
                `)
            myGame.setWalkImage(player, myGame.aniKind.Hurt, [img`
                . f f f . . . . . . 5 . f f f . 
                . c b b c f . . . . 5 . . c f f 
                . . c b b c f . . . 5 . . c c f 
                . . c c c b f . . . . . . . f c 
                . . c c b b f f . . 5 . . f f c 
                . . c b b c b f c c . c c f f f 
                . . c b c c b f c c c c c f f f 
                . . . c c c b c b 3 c c 3 c f . 
                . . . c c c c b b 3 c b 3 b c . 
                . . . . c c b b b b b b b b c c 
                . . . c f b b b 1 1 b b b 1 1 c 
                . . c c f b b b b b b b b b b f 
                . . . . f b b b b c b b b c b f 
                . . . . f c b b b 1 f f f 1 f . 
                . . . . . f c b b b b b b f . . 
                . . . . . . f f f f f f f . . . 
                `,img`
                f f f . . . . . 2 . . f f f . . 
                c b b c f . . . 2 . . c c f f . 
                . c b b c f . . 2 . . . c c f f 
                . c c c c f . . . . . . c f c f 
                . c c b b b f . 2 c . c c f f f 
                . c b b c b f c c 3 c c 3 c f f 
                . c b c c b f c b 3 c b 3 b f f 
                . . c c c b b c b 1 b b b 1 c . 
                . . . c c c c b b 1 b b b 1 c . 
                . . . . c c b b b b b b b b b c 
                . . . . f b b b b c 1 f f 1 b c 
                . . . c f b b b b f 1 f f 1 f f 
                . . c c f b b b b f 2 2 2 2 f f 
                . . . . f c b b b b 2 2 2 2 f . 
                . . . . . f c b b b b b b f . . 
                . . . . . . f f f f f f f . . . 
                `,img`
                f f f . . . . . . . . f f f . . 
                c b b c f . 9 . . . . c c f f . 
                . c b b c f . 9 . . 9 . c c f f 
                . c c c 9 f . 9 . 9 . . c f c f 
                . c c b b 9 f . c c . c c f f f 
                . c b b c b f c c 3 c c 3 c f f 
                . c b c c b f c b 3 c b 3 b f f 
                . . c c c b b c b 1 b b b 1 c . 
                . . . c c c c b b 1 b b b 1 c . 
                . . . . c c b b b b b b b b b c 
                . . . . f b b b b c 1 f f 1 b c 
                . . . c f b b b b f 1 f f 1 f f 
                . . c c f b b b b f 2 2 2 2 f f 
                . . . . f c b b b b 2 2 2 2 f . 
                . . . . . f c b b b b b b f . . 
                . . . . . . f f f f f f f . . . 
                `,img`
                . . . . . . 9 . . . . f f f . . 
                f f f . . . . 9 . . . c c f f f 
                c b b c 9 9 . . c c . c c c f f 
                . c b b b f 9 c c 3 c c 3 c f f 
                . c c c b b f c b 3 c b 3 c f f 
                . c c b c 9 f c b b b b b b c f 
                . c b 9 c b b c b 1 b b b 1 c c 
                . c b c c c b b b b b b b b b c 
                . . c c c c c b b c 1 f f 1 b c 
                . . . c f b b b b f 1 f f 1 f c 
                . . . c f b b b b f f f f f f f 
                . . c c f b b b b f 2 2 2 2 f f 
                . . . . f c b b b 2 2 2 2 2 f . 
                . . . . . f c b b b 2 2 2 f . . 
                . . . . . . f f f f f f f . . . 
                . . . . . . . . . . . . . . . . 
                `,img`
                . . . . . 9 . . . . . . . . . . 
                . . 9 . . . 9 . . . . . . . . . 
                . . . . 9 . . . c c . c c . . . 
                . . . . . 9 c c c 3 c c 3 f . . 
                . . . 9 . c c c b 3 c b 3 c f . 
                . . . . f f b b b b b b b b c f 
                . . . . f f b b b 1 b b b 1 c c 
                . . . f f f c b b b b b b b b c 
                . . . f f f f b b c 1 f f 1 b c 
                . . . b b b c c b f 1 f f 1 f f 
                . . . c c c c f b f f f f f f f 
                . . c c c b b f b f 2 2 2 2 f f 
                . . . c b b c c b 2 2 2 2 2 f . 
                . . c b b c c f f b 2 2 2 f . . 
                . c c c c c f f f f f f f . . . 
                c c c c . . . . . . . . . . . . 
                `])
            myGame.setWalkImage(player, myGame.aniKind.Stand, [img`
                fff........fff..
                cbbcf......ccff.
                .cbbcf......ccff
                .cccbf......cfcf
                .ccbbcf.cc.ccfff
                .cbbcbfcc3cc3cff
                .cbccbfcb3cb3bff
                ..cccbbcbbbbbbc.
                ...ccccbb1bbb1c.
                ....ccbbbbbbbbbc
                ....fbbbbcbbbcbc
                ...cfbbbb1fff1bf
                ..ccfbbbbbbbbbbf
                ....fcbbbbbbbbf.
                .....fcbbbbbbf..
                ......fffffff...
                ................
                ................
                ................
                ................
                ................
                ................
                `,img`
                ...........fff..
                fff........ccfff
                cbbcf...cc..ccff
                .cbbbffcc3cc3cff
                .cccbbfcb3cb3bff
                .ccbcbfcbbbbbbc.
                .cbbcbbcbbbbbbc.
                .cbcccbbb1bbb1bc
                ..cccccbbbbbbbbc
                ...cfbbbbcbbbcbf
                ..ccfbbbb1fff1bf
                ....fcbbbbbbbbf.
                .....fcbbbbbbf..
                ......fffffff...
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                `,img`
                ................
                ........cc..cc..
                ......ccc3cc3c..
                .....cccb3cb3bc.
                ....ffbbbbbbbbc.
                ....ffbbbbbbbbcc
                ...fffcbb1bbb1bc
                ...ffffbbbbbbbbc
                ...bbbccbcbbbcbf
                ...ccccfb1fff1bf
                ...ccbbfbbbbbbf.
                ...cbbccbbbbbfcc
                ..cbbccffffffccc
                .ccccc......ccc.
                cccc.......ccc..
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                `,img`
                .fff........fff.
                .cbbcf.......cff
                ..cbbcf......ccf
                ..cccbf.......fc
                ..ccbbff.....ffc
                ..cbbcbfcc.ccfff
                ..cbccbfcccccfff
                ...cccbcb3cc3cf.
                ...ccccbb3cb3bc.
                ....ccbbbbbbbbcc
                ...cfbbbb1bbb1bc
                ..ccfbbbbbbbbbbf
                ....fbbbbcbbbcbf
                ....fcbbb1fff1f.
                .....fcbbbbbbf..
                ......fffffff...
                ................
                ................
                ................
                ................
                ................
                ................
                `])
            myGame.setWalkImage(player, myGame.aniKind.Walk, [img`
                fff........fff..
                cbbcf......ccff.
                .cbbcf......ccff
                .cccbf......cfcf
                .ccbbcf.cc.ccfff
                .cbbcbfcc3cc3cff
                .cbccbfcb3cb3bff
                ..cccbbcbbbbbbc.
                ...ccccbb1bbb1c.
                ....ccbbbbbbbbbc
                ....fbbbbcbbbcbc
                ...cfbbbb1fff1bf
                ..ccfbbbbbbbbbbf
                ....fcbbbbbbbbf.
                .....fcbbbbbbf..
                ......fffffff...
                ................
                ................
                ................
                ................
                ................
                ................
                `,img`
                ...........fff..
                fff........ccfff
                cbbcf...cc..ccff
                .cbbbffcc3cc3cff
                .cccbbfcb3cb3bff
                .ccbcbfcbbbbbbc.
                .cbbcbbcbbbbbbc.
                .cbcccbbb1bbb1bc
                ..cccccbbbbbbbbc
                ...cfbbbbcbbbcbf
                ..ccfbbbb1fff1bf
                ....fcbbbbbbbbf.
                .....fcbbbbbbf..
                ......fffffff...
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                `,img`
                ................
                ........cc..cc..
                ......ccc3cc3c..
                .....cccb3cb3bc.
                ....ffbbbbbbbbc.
                ....ffbbbbbbbbcc
                ...fffcbb1bbb1bc
                ...ffffbbbbbbbbc
                ...bbbccbcbbbcbf
                ...ccccfb1fff1bf
                ...ccbbfbbbbbbf.
                ...cbbccbbbbbfcc
                ..cbbccffffffccc
                .ccccc......ccc.
                cccc.......ccc..
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                `,img`
                .fff........fff.
                .cbbcf.......cff
                ..cbbcf......ccf
                ..cccbf.......fc
                ..ccbbff.....ffc
                ..cbbcbfcc.ccfff
                ..cbccbfcccccfff
                ...cccbcb3cc3cf.
                ...ccccbb3cb3bc.
                ....ccbbbbbbbbcc
                ...cfbbbb1bbb1bc
                ..ccfbbbbbbbbbbf
                ....fbbbbcbbbcbf
                ....fcbbb1fff1f.
                .....fcbbbbbbf..
                ......fffffff...
                ................
                ................
                ................
                ................
                ................
                ................
                `], 100)
            myGame.setAbility(player, myGame.abilityKind.jumpspeed, 150)
        })
        
        myGame.skillSet("未命名", function (player) {
            myGame.setSkill(player, myGame.SkillKind.A, 0, function (tempVar, player2) {
            })
            myGame.setSkill(player, myGame.SkillKind.B, 0, function (tempVar, player2) {
            })
        })
        //复制到这里为止

        //要进入游戏测试，可以在'当开机时'使用PlayGame的'开始游戏'
    }
}
*/
