
// validate the register
export const validateRegister = (data: any) => {
  const { name, email, phone,password } = data;

  if (!name) return "Name is required";

  if (!email && !phone) {
    return "Email or phone is required";
  }
  if(!password) return "Password is required"
  return null;
};

// validate login

export const validateLogin=(data:any)=>{
  const {email,password,phone}=data
  if (!phone && !email) return "Phone and email both empty"

  if (!password) return "Password is required"

  return null
}