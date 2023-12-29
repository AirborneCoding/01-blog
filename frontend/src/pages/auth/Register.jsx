import React from "react";
import { FormInput, SubmitBtn } from "@/helpers";
import { Link } from "react-router-dom";
import useRegister from '@/hooks/auth/useRegister';

const Register = () => {
    const { handleRegister, isLoading, } = useRegister();

    return (
        <>
            <main className="body-container min-h-screen flex items-center justify-center">
                <form onSubmit={handleRegister} >
                    <div className="mb-5 text-center">
                        <b className=" text-[33px] inline-block font-libre-baskerville text-black ">Become a member!</b>
                        <h5 className=" text-[16px] leading-[24px] font-open-sans text-black text-center mt-2">Sign u to get the most out of nuntium.</h5>
                    </div>
                    <FormInput
                        name="username"
                        type="text"
                        required={true}
                        holder="username"
                        shadow="md"
                        shadowColor="gray-100"
                    />
                    <FormInput
                        name="email"
                        type="email"
                        required={true}
                        holder="email"
                        shadow="md"
                        shadowColor="gray-100"
                    />
                    <FormInput
                        name="password"
                        type="password"
                        required={true}
                        holder="password"
                        shadow="md"
                        shadowColor="gray-100"
                    />
                    <div className="mt-8">
                        <SubmitBtn
                            text={isLoading ? "Please wait..." : "register"}
                            disabled={isLoading}

                        />
                    </div>
                    <Link to="/login" className='text-start font-medium  inline-block pt-1.5'>
                        <span className='label-text capitalize underline'>Already Member</span>
                    </Link>
                </form>
            </main>
        </>
    )
};

export default Register;