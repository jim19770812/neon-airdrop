let eth_address=[
'0x6bEd55653141B8C50bB960fCcd794244826a99f0', //挖矿账户2
'0xe92a6F2F2DEAEC81275Ed144C86722aF9373F0CD', //swarm-node1
'0xAD94F4720927B2829666EF8Bae1e093eC6a90952', //account1
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

/**
* 账户间转账选择器
*/
class EthAccountSelector2{
    __ethAddressList = []
    constructor(list) {
        this.__ethAddressList = list;
    }
    titleList = () => {
        //0xE11b...6354
        let ret=this.__ethAddressList.map(o => {
            let s = String(o)
            let s1 = s.substring(0, 5);
            let s2 = s.substring(s.length - 4, s.length)
            return s1 + '...' + s2
        })
        return ret
    }
    indexOf=(title)=>{
        let ret = this.titleList().indexOf(title)
        return ret
    }
}

class Utils {
    /**
    * 带回调的延迟函数
    sleep2(1000).then((resolve, reject)=>console.log("done"))
    */
    static sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    /**
    * 等待某个选择器出现
    */
    static waitFor = (selector, loopCount) => {
        return new Promise((resolve, reject) => {
            var result = null;
            while (loopCount > 0) {
                ret = document.querySelector(selector);
                if (ret !== null)
                    break;
                sleep(100)
                console.log(selector + ' 没有找到，继续等待...')
                loopCount--
            }
            return ret
        })
    }
}

let test1 = () => {
    let es = new EthAccountSelector2(eth_address)
    let t = es.titleList()
    console.log(t[49])
    let idx = es.indexOf('0xB3a...3d79')
    console.log(idx)
}

let test2 = () => {
    Utils.sleep(1000).then((a, b) => {
       console.log("done")
    })
    //console.log('done2')

}

let test3 = () => {
    Promise.all([Utils.sleep(1000).then((a, b) => {
        console.log("1")
    }), Utils.sleep(1000).then((a, b) => {
        console.log(2)
    })])
}

let test4 = () => {
    setInterval(() => {
        console.log('1')
    }, 1000);
}
test4()
