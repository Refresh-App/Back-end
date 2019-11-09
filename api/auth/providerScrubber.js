module.exports=function(profile){
const cleanProfile ={}
const addProp = (prop, value) =>{
    cleanProfile[prop] = value
}
//display_name
!!profile.name && addProp('display_name',profile.name)//Google,GitHub

//lname
!!profile.family_name && addProp('lname',profile.family_name)//google

//fname
!!profile.given_name && addProp('lname',profile.given_name)//google


//bio
!!profile.bio && addProp('bio',profile.bio)//gitHub

return cleanProfile
}