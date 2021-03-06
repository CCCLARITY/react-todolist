import AV from 'leancloud-storage'

var APP_ID = 'As0jeXVikLpvucJD7bA61VBk-gzGzoHsz';
var APP_KEY = 'AceBf1kFRFQfw2J1Ucxjg0LS';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV;

function signUp(email, username, password, successFn, errorFn){
    // 新建 AVUser 对象实例
    var user = new AV.User();
    // 设置用户名
    user.setUsername(username);
    // 设置密码
    user.setPassword(password);
    // 设置邮箱
    user.setEmail(email);

    user.signUp().then(function (loginedUser) {
        console.log(loginedUser);
        let user = getUserFromAVUser(loginedUser)
        successFn.call(null, user)
    }, function (error) {
        errorFn.call(null, error)
    });
}

function signIn(username, password, successFn, errorFn){
    AV.User.logIn(username, password).then(function (loginedUser) {
        let user = getUserFromAVUser(loginedUser)
        successFn.call(null, user)
        console.log('登录啦')
        console.log(loginedUser)
    }, function (error) {
        errorFn.call(null, error)
    });
}

function getUserFromAVUser(AVUser){
    return {
        id: AVUser.id,
        ...AVUser.attributes
    }
}

function getCurrentUser(){
    let user = AV.User.current()
    if(user){
        return getUserFromAVUser(user)
    }else{
        return null
    }
}

function signOut(){
    AV.User.logOut()
    return undefined
}

function sendPasswordResetEmail(email, successFn, errorFn){
    AV.User.requestEmailVerify(email).then(function (result) {
        successFn.call()
    }, function (error) {
        successFn.call(null, error)
    });
}

export {signUp};
export {getCurrentUser};
export {signOut};
export {signIn};
export {sendPasswordResetEmail};