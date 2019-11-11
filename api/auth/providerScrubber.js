module.exports=function(profile){
const cleanProfile ={}
const addProp = (prop, value) =>{
    cleanProfile[prop] = value
}

//display_name
!!profile.name && addProp('display_name',profile.name)//Google,GitHub,facebook

//lname
!!profile.family_name && addProp('lname',profile.family_name)//google
!!profile.last_name && addProp('lname',profile.last_name)//facebook

//fname
!!profile.given_name && addProp('fname',profile.given_name)//google
!!profile.first_name && addProp('fname',profile.first_name)//facebook

//bio
!!profile.bio && addProp('bio',profile.bio)//gitHub

//Profile Picture


return cleanProfile
}