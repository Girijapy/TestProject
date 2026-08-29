import User from "./UserModal.js";

export const getUsers = async () => {
    try{
    const users = await User.find();
    const usersConverted = users.map(user => user.toJSON());
    console.log(usersConverted);
    return usersConverted;
    }catch(error){
        console.log(error);
    }
}

export const createUser = async (user) => {
    return await User.create(user);
}

export const getUser = async (nameFromQuery) => {
    const users =  User.findOne ({name: nameFromQuery});
    return userstoJson;
}
export const updateUser = async (name,user) => {
    const updateuser =  await user.findOneAndUpdate ({name: name}, user);
    return userstoJson;
}
export const deleteUser = async (name) => {
  return await User.findOneAndDelete({ name: name });
};