/*microsoft edge 专用转账脚本*/

/**
* 账户间转账选择器
*/
class EthAccountSelector{
    compress_str=(str)=>{
        let s = String(str)
        let s1 = s.substring(0, 6);
        let s2 = s.substring(s.length - 4, s.length)
        return s1 + '...' + s2
    }
    /**
    * 在节点列表里查找指定的eth地址索引
    * @return index
    */
    indexOf=(nodeList, address)=>{
        for(let index=0; index<=nodeList.length-1; index++){
            let temp=nodeList[index].textContent
            let s1=temp.toLocaleLowerCase()
            let adr=String(address)
            console.log("address", adr)
            let s2=this.compress_str(adr.toLocaleLowerCase())
            if (s1==s2){
                return index
            }
        }
        return -1

    }
}

class Utils {
    /**
    * 带回调的延迟函数
    sleep2(1000).then((resolve, reject)=>console.log("done"))
    */
    static sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
    * 等待某个选择器出现
    */
    static waitFor(selector, waitSec, loopCount){
        return new Promise((resolve, reject) => {
            let result = null;
            while (loopCount > 0) {
                let temp=new Promise(resolve => setTimeout(resolve, waitSec*1000)).then((rv, rj)=>{
                    ele = document.querySelector(selector);
                    if (ele!==undefined && ele !== null){
                        //return Promise.succ(ele)
                        return rv(Result.succ(ele))
                    }
                    //return Promise.reject(Result.error('没有找到元素 '+ selector+' 第'+loopCount+'次'))
                    return rj(Result.error('没有找到元素 '+ selector+' 第'+loopCount+'次'))
                })
                if (temp.isError()){
                    console.log(temp.getMessage())
                    loopCount--
                    continue
                }
                //return Promise.resolve(temp)
                return rj(temp)
            }
            return Promise.reject(Result.error("超过最大尝试次数仍未获取元素 "+selector))

        })
    }

    static async waitFor(selector, waitSec, loopCount){
        
    }

    /*
        获取随机数
    */
    static random=(minVal, maxVal)=>{
        return (Math.floor(Math.random()*maxVal*10)+minVal*10)/10;
    }
}

class Result{
    result=false
    message=""
    data=null
    static succ(){
        let ret=new Result()
        ret.result=true
        return ret
    }
    static succ(data){
        let ret=new Result()
        ret.result=true
        ret.data=data
        return ret
    }
    static error(message){
        let ret=new Result()
        ret.result=false
        ret.message=message
        return ret
    }
    getData(){
        return this.data
    }
    getMessage(){
        return this.message
    }
    isSucc(){
        return this.result
    }
    isError(){
        return !this.result
    }
}

function send_p() { //发送按钮
    return new Promise((resolve, reject)=>{
        let el = document.querySelectorAll('.icon-button__circle')[1];
        if (el===undefined || el===null){
            return reject(Result.error('没有找到发送按钮'))
        }
        el.click();//点击发送按钮
        return resolve(Result.succ());
    })
}

function transfer_in_account_p(){
    return new Promise((resolve, reject)=>{ //在我的账户间转账
        let el=document.querySelector('.button.btn-link.send__select-recipient-wrapper__list__link')
        if (el===null){
            return reject(Result.error("没有找到在我的账户间转账"))
        }
        el.click()
        return resolve(Result.succ())

    })
}


/*
 *   在我的账户中选择一个
 *   
 */

function account_list_p(to_addr){
    return new Promise((resolve, reject)=>{
        let nlist=document.querySelectorAll('.send__select-recipient-wrapper__group-item__subtitle')
        if (nlist===null || nlist.length===0){
            return reject(Result.error('没有找到选择账户'))
        }
        let selector=new EthAccountSelector()
        let index=selector.indexOf(nlist, to_addr)
        if (index===null || index<0){
            return reject(Result.error('没有找到选择账户中的索引'+index))
        }
        nlist[index].click()//点击符合条件的帐号
        return resolve(Result.succ())
    })
}

/*
    设置转账金额
*/
function set_amount_p(amount){
    return new Promise((resolve, reject)=>{
        let el = document.querySelector('.unit-input__input-container>input[type=number]')//转账金额
        if (el===null){
            return reject(Result.error('转账金额没有找到'))
        }
        el.focus()
        el.value=parseFloat(amount)
        //el.setSelectionRange(-1, -1)
//         Utils.sleep(100).then((rs, rj)=>{
//             el.value=amount
//             return Promise.resolve(Result.succ())
//         })
        return resolve(Result.succ())
    })
}

/*设置gas费*/
function set_gas_p(val){
    return new Promise((resolve, reject)=>{
        let el=document.querySelector('.advanced-gas-inputs__gas-edit-row__input[data-testid=gas-price]') //gas费
        if (el===null){
            return reject(Result.error('gas fee 没有找到'))
        }
        el.focus()
        let ret=Utils.sleep(100).then((resolve1, reject1)=>{
            el.value=val
            return Promise.resolve(Result.succ())

        })
        return resolve(ret)
    })
}

/*设置gas限制*/
function set_gas_limit_p(val){
    return new Promise((resolve, reject)=>{
        let el=document.querySelector('.advanced-gas-inputs__gas-edit-row__input[data-testid=gas-limit]') //gas限制
        if (el===null){
            return reject(Result.error('gas limit 没有找到'))
        }
        el.focus()
        let ret=Utils.sleep(100).then((resolve1, reject1)=>{
            el.value=val
            return Promise.resolve(Result.succ())

        })
        return resolve(ret)
    })
}


/*
    点击下一步
*/
function next_button_p(){
    return new Promise((resolve, reject)=>{
        let el=document.querySelector('.button.btn--rounded.btn-primary.page-container__footer-button:enabled')
        if (el===null){
            return reject(Result.error('可用的下一步按钮没有找到'))
        }
        el.focus()
        let ret=Utils.sleep(300).then((resolve1, reject1)=>{
            el.click()//点击下一步
            return Promise.resolve(Result.succ())

        })
        return resolve(ret)
    })
}

/* 确认转账按钮 */
function confirm_button_p(to_addr){
    return new Promise((resolve, reject)=>{
        let ret=Utils.sleep(8000).then((rs1, rj1)=>{
            let el=document.querySelector('.button.btn--rounded.btn-primary.page-container__footer-button')
            if (el==undefined || el===null){
                console.warn("未能找到确认按钮")
                return new Promise((t1,t2)=>{})
            }
            el.focus()
        }).then((rs2, rj2)=>{
            el.click()//点击下一步
        })
        return resolve(Result.succ())
    })
}

/*转向到首页*/
function go_home(){
    return new Promise((resolve, reject)=>{
        let elLoop=2
        while(elLoop>0){
            /*查找右上角的取消按钮并点击*/
            let el1=document.querySelector('.button.btn-link.page-container__header-close-text')
            let el1_enabled=el1!==undefined && el1!==null
            if (el1_enabled){
                el1.click()
                elLoop=0
            }else{
                /*查找左下角的取消按钮*/
                let el2=document.querySelector('.button.btn--rounded.btn-secondary.page-container__footer-button[data-testid=page-container-footer-cancel]')
                let el2_enabled=el2!==undefined && el2!==null
                if (el2_enabled){
                    el2.click()
                    elLoop=0
                }else{
                    /*查找左下角的拒绝按钮*/
                    let el3=document.querySelector('.button.btn--rounded.btn-secondary.page-container__footer-button[data-testid=page-container-footer-cancel]');
                    let el3_enabled=el3!==undefined && el3!==null
                    if (el3_enabled){
                        el3.click()
                        elLoop=0
                    }else{
                        elLoop--
                    }
                }
            }
        }
        resolve(Result.succ())

    })
}

/*擦寻余额*/
function get_balance(){
    return new Promise((resolve, reject)=>{
        let el=document.querySelector('.currency-display-component__text')
        if (el==undefined || el===null){
            return reject(Result.error('没有找到余额'))
        }
        return resolve(Result.succ(el.textContent))
    })

}

async function transferTo(to_addr, amount){
    /*返回到首页*/
    await go_home()
    await Utils.sleep(1000)

    let ret=null

    /*确认余额，如果余额不足就退出*/
    ret=await get_balance()
    if (ret.isError()){
        //console.error(ret.getMessage())
        return ret
    }

    try{
        if (parseFloat(ret.getData())<amount){ //余额不足
            console.error('余额不足，只有', ret.getData(), "了")
            return Result.error('余额不足')
        }

    }catch(e){
        return Result.error(e)
    }

    ret=await send_p()
    if (ret.isError()){
        //console.error(ret.getMessage())
        return ret
    }
    console.log(ret)
    await Utils.sleep(300)
    ret=await transfer_in_account_p()
    if (ret.isError()){
        //console.error(ret.getMessage())
        return ret
    }
    await Utils.sleep(300)
    ret=await account_list_p(to_addr)
    if (ret.isError()){
        //console.error(ret.getMessage())
        return ret
    }
    await Utils.sleep(500)
    ret=await set_amount_p(amount)
    if (ret.isError()){
        //console.error(ret.getMessage())
        return ret
    }
    await Utils.sleep(500)
    let gas=Math.round(Utils.random(3, 36500))
    ret=await set_gas_p(gas)
    if (ret.isError()){
        //console.error(ret.getMessage())
        return ret
    }
    await Utils.sleep(500)
    ret=await set_gas_limit_p(21000)
    if (ret.isError()){
        //console.error(ret.getMessage())
        return ret
    }
    await Utils.sleep(300)
    ret=await next_button_p()
    if (ret.isError()){
        //console.error(ret.getMessage())
        return ret
    }
    //await Utils.sleep(10000)

    ret=await confirm_button_p()
    if (!ret.ret){
        //console.error(ret.getMessage())
        return ret
    }
    console.log('转账完成')
    return Result.succ()
}

/*测试程序*/
async function test(){
    await go_home()
    console.log('done')
}

/*启动随机转账*/
async function start(){
    //'0x6bEd55653141B8C50bB960fCcd794244826a99f0', //挖矿账户2
    let r_addrs=[
        '0xe92a6F2F2DEAEC81275Ed144C86722aF9373F0CD', //swarm-node1
        '0x98840282a34956627FcD22E3AA139237EF8E9cBE', //account2
        '0x140d084f907973818382cFf6612A7313C928b6D4', //account5
        '0xa4EE513c0e60ED29BD8881b7e45B189CCD9cc22B', //account6
        '0x65bEa4361903AdB365c59b23d7F0FaC8472F7843', //account7
        '0xE1b291F1A5bDff53CdB75584C5bD6e5Cc6ACf4CC', //account8
        '0x14F4363d6EaC12BBCe8930dE78BBa41B29EEab88', //account9
        '0x575d4B1759c587D7b1FAC072704086e34b53e2CB', //account10
        '0x4E4498dcc77C6EDF4AF4bA7c3F3286bA3fdC3a65', //account11
        '0x3896a7f7c694511ebB86dD8295227F8a0aC01cBC', //account12
        '0x64f1e61CD624637129133BF232F0df3cA80776E1', //account13
        '0xdA8D4B7509dCDAc9fca7D7F6B686fF0e96A7B94f', //account14
        '0xeB76C8F9bea0172595445110Ad65Ac965b3C99e0', //account15
        '0xAcb37dd9cD874da22449DA37ED96B64A45CCFcc7', //account16
        '0x2Fe35496AF2808f5BD277Ae000a3C64df0B0C893', //account17
        '0x43C6de9c0aE3B134CA67E6E3B82548F93cc64e5D', //account18
        '0xDA19D38f718Aac6342D16eF0B55e2455bcaE78e6', //account19
        '0xcb5C5F5755Ed8c5224234388d2E15A81dFC2297A', //account20
        '0x693Ff3223f58eF36d5e66498cABb3d2Eb476ce93', //account21
        '0xF2060cf7ee9BEE56A5074e8f758c4007960D6b23', //account22
        '0xf209f3A07A23F68a8787D972922Bb63BEad0Db52', //account23
        '0xC702Eb43D327B838384927594913D39Ad7353443', //account24
        '0x67EEcD04e09193B557da66828625c91dC2705385', //account25
        '0xc259dE26Ef0cdD9abAB178A2C722007C89B7d03B', //account26
        '0x2943446CA24b4E7d27e10E8Ed9ff340B61bEF97c', //account27
        '0x48ce07BB9dE37Eb651390A51C1a77b07ea5eE8BC', //account28
        '0xA405736Cb7F3bE69c3637293AE5b04ac917d43c9', //account29
        '0x36dB0bF47aB26555077e2469Dd4F48E03a59Aa11', //account30
        '0xc0a1dCf5F57248a4044f5fAe1FA85df60984fE8a', //account31
        '0x31f1Dd1CF55c73F442A67ac7CB7fC0f35d9cc600', //account32
        '0x0De77731a85dC3Bd829D09c4becb6aeD30cC46EB', //account33
        '0x8B2CfC54Db2Afe695B1c4eF8d9CA6e97B101DDc7', //account34
        '0x7333b9dF28e33aCfddA0B8B8129a9F1A1c6f27Ce', //account35
        '0xB35c11BdAE3D8764cC26b7E89565b857463FB37e', //account36
        '0xb3e008ad879DB5c4b5b90287Ec18cfcD91755E16', //account37
        '0xF8Ef8029C9a5168d61027d260B9FfA2A6E28Ad25', //account38
        '0x69D8e2eff559480A5a3bcBA77b8cd3937b83Ab2E', //account39
        '0x9BbD1092b3f15B45b061c73234e0211A06F07739', //account40
        '0x97a1Ee3Bfe589a3f6e8C9A2E6CebB3B925cA38Ce', //account41
        '0x2AB7793cac5E9C3facBa39F667B75EBDc1a1e84F', //account42
        '0xd09dce700379bC0B1F048633e8f9f0021e160A02', //account43
        '0x64e799972ED9CcFA403B0186Ef3F32f05Cbf9Fbc', //account44
        '0x6fbFc3aE79A73e2d24c96F13c462f4e2FA6DBc82', //account45
        '0xe88699d012656d8BAfAE8235c7034b71D87dD5F9', //account46
        '0xcF6dea43cc8df8A4Bb026A962dAc0a703481D08c', //account47
        '0x4817254336eE502c7358fcCA7C79f8b1dBb69Be9', //account48
        '0x3f9C11385E2c0da77db6881F884BB34fdF930C90', //account49
        '0xB3a85685eC4598332c46cB25a9af6442BD543d79' //account50
    ]

    let i=0;
    while (true){
        if (i>=2){
            return
        }
        let idx=Math.floor(Utils.random(0, r_addrs.length-1))
        let amount=Math.round(Utils.random(3.1, 12.9))
        let waitSec=Math.round(Utils.random(23, 35))
        let addr=r_addrs[idx]
        console.warn('向目标地址', addr, '发起转账', amount,'个NEON....')
        let ret=await transferTo(addr, amount)
        if (ret.isError()){
            console.log("有错误发生：",ret.getMessage)
        }else{
            console.warn('向目标地址', addr, '转账完成', amount,'个NEON')
        }
        i++
        await Utils.sleep(waitSec*1000)
        console.log("sleep")
    }
}

async function test2(){
    //let el = document.querySelector('.unit-input__input-container>input[type=number]')//转账金额
    let ret=await Utils.waitFor('.unit-input__input-container>input[type=number]', 300, 10)
    console.log(ret)
}
// test()
//transferTo(to_addr, 1) //转账

//let idx=Utils.random(0, r_addrs.length-1)

// start()

test2()