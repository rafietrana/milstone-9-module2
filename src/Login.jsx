import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "./Firebase/firebase.config";
import { useRef, useState } from "react";


 

const Login = () => {
  const [registerError, setRegisterError] = useState('')
const [sucess, setSucess] = useState('');

const forgetRef = useRef();





  const handleLoginBtn = e => {
    
    e.preventDefault();
    
    const emails = e.target.emails.value;
    const passwords = e.target.passwords.value;

    if(passwords.length < 6){
      setRegisterError('Hay  Password should be 6 cheracter must pleaser write strong password');
      return;
  }
  else if(!/[A-Z]/.test(passwords)){
      setRegisterError('Uppercase Word not Found');
      return;
  }
 
     setRegisterError('');
     setSucess('')

    
     signInWithEmailAndPassword(auth, emails, passwords)
     .then(result => {
      console.log(result.user);
      if(result.user.emailVerified){
        setSucess('this is succes')
        console.log(result.user);
      }
      else(
        alert('Please Varified Your Email Firstly')
      )
     })
     .catch(error =>{
      const errors = error.message;
      setRegisterError(errors)
     })
  }
  // handle forgetPassword btn
 

  const handleForgetPasswordBtn =() =>{
   const email = forgetRef.current.value;
   console.log('email is now ',  email);



   if(!email){
    console.log('Please Provide Your Email');
    return;
   }
   else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    alert('Hay Bro Please Provide an Valied Email');
    return;
   }

   sendPasswordResetEmail(auth, email)
   .then( result => {
    console.log(result);
   })
   .catch(error =>{
       console.log(error);
   })
   
  }
    
    return (
        <div className="mx-auto w-9/12 flex justify-center items-center">
        <div className="my-10 bg-gray-100 w-full lg:w-6/12 flex justify-center">
          <form onSubmit={handleLoginBtn}   className="py-5 space-y-5 px-5">
            <input
              ref={forgetRef}
              className="py-2 px-3 w-full"
              type="email"
              name="emails"
              placeholder="Email"
            />
            <input
              className="py-2 px-3 w-full"
              type="password"
              name="passwords"
              placeholder=" Your Password"
            />
            <button className="bg-white font-bold px-3 py-2 w-full ">
              Login
            </button>
            


            <div className="mb-5">
      {
            registerError && <p className="text-red-800">{registerError}</p>

        }
        {
            sucess && <p className="text-green-500"> {sucess}</p>
        }
      </div>
      <p onClick={handleForgetPasswordBtn} className="cursor-pointer ">Forget Password</p>

          </form>

        </div>
      </div>
    );
};

export default Login;