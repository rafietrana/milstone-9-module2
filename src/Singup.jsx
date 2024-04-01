import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "./Firebase/firebase.config";
import { useState } from "react";
import { FaEyeSlash, FaEye  } from "react-icons/fa";
const Singup = () => {
    const [registerError, setRegisterError] = useState('')
    const [sucess, setSucess] = useState('');
    const [showPassword, setShowPassword] = useState(false)
  
 
 
  const handleOnSubmitBtn = (e) => {
    e.preventDefault();
    const names = e.target.name.value;
    const emails = e.target.email.value;
    const passwords = e.target.password.value;
    const accpted = e.target.tarms.checked;
    console.log(accpted)
    // reset

    if(passwords.length < 6){
        setRegisterError('Hay Brother Password should be 6 cheracter must pleaser write strong password');
        return;
    }
    else if(!/[A-Z]/.test(passwords)){
        setRegisterError('Uppercase Word not Found');
        return;
    }
    else if(!accpted){
      setRegisterError('Please Accpted Our Tarms and condition');
      return;
    }

    setRegisterError('');
    setSucess('');
    createUserWithEmailAndPassword(auth, emails, passwords)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSucess('User Login Sucessfully')
        e.target.reset()




        // send emaill varification

        sendEmailVerification(result.user)
        .then( () =>{
        alert("please check your account and varyfied now this ");
        })

//  update user Profile
        updateProfile(result.user, {
          displayName: names,
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
        .then(() =>{
          setSucess('hay rana user login succesfully alhamdulillh')
        })
        .catch(() =>{
          setRegisterError('not updated profile')
        })
       
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        setRegisterError(error.message);
      });
  };
  return (
    <div className="mx-auto w-9/12 flex flex-col justify-center items-center">
      <div className="my-10 bg-gray-100 w-full lg:w-6/12 flex justify-center">
        <form onSubmit={handleOnSubmitBtn} className="py-5 space-y-5 px-5">
          <input   className="py-2 px-3 w-full bg-white" type="text" name="name" placeholder="Your Name" required />
          <br />
           <input
            className="py-2 px-3 w-full bg-white"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
         <div className="relative ">
         <input
            className="py-2 px-3 w-full "
            type={showPassword ? "text" : "password" }
            name="password"
            placeholder=" Your Password"
            required


          />
        <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer absolute top-3 right-2">
            {
              showPassword ?<FaEyeSlash /> : < FaEye />
            }

        </span>
         </div>
         <input type="checkbox" name="tarms" id="chack" />
         <label className="ml-2" htmlFor="chack">Accpt Our Terms and condititon</label>
          <button className="bg-white font-bold px-3 py-2 w-full ">
            Sing Up
          </button>
        </form>

      </div>
      <div className="mb-5">
      {
            registerError && <p className="text-red-800">{registerError}</p>

        }
        {
            sucess && <p className="text-green-500"> {sucess}</p>
        }
      </div>

    </div>
  );
};

export default Singup;
