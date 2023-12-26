import React from "react";
import { CheckboxInput, FormInput, SubmitBtn } from "@/helpers";
import { Link } from "react-router-dom";

// rectangle-13@2x.png
const RememberMe = () => {
  return (
    <>

      <main className="body-containermin-h-screen flex items-center justify-center">
        <form action="">
          <figure className="text-center">
            <img src={"/rectangle-13@2x.png"}
              alt=""
              className="person-img" />
          </figure>
          <FormInput
            name="password"
            type="text"
            required={true}
            holder="password"
            shadow="md"
            shadowColor="gray-100"
          />
          <div className="flex justify-between items-center mt-4">
            <div className="text-[12px] font-medium text-gray-100 text-right inline-block w-[108px] h-[17px]">
              <CheckboxInput
                label="Remembr me"
              />
            </div>
            <Link className=' font-medium text-gray-100 text-right inline-block pt-1.5'>
              <span className='label-text capitalize underline'>forgot Password</span>
            </Link>
          </div>
          <div className="mt-8">
            <SubmitBtn
              text="Login"
            />
          </div>
          <Link to="/register" className='text-start font-medium text-gray-100 inline-block pt-1.5'>
            <span className='label-text capitalize underline'>Not Member yet?</span>
          </Link>
        </form>
      </main>
    </>
  )
};

export default RememberMe;
