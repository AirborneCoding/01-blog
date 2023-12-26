import {
    AutoInput,
    FileUpload,
    FormArrayInput,
    FormInput,
    SelectInput,
    TextEditor, SubmitBtn
} from "@/helpers";

import useCategory from "@/hooks/categories/UseCategory";
import useWritePost from "@/hooks/dashboard/useWritePost";

const AddPost = () => {
    const { categories } = useCategory()
    const {
        onSubmit,
        isFormValid,
        postLoader,
        handleInputChange
    } = useWritePost()

    return (
        <main className="grid place-content-center mt-1.5 w-56 mx-auto md:w-auto">
            <div>
                <h5 className="text-md mt-10">Add post</h5>
            </div>
            <hr />
            <form className="mt-10" onSubmit={onSubmit} onChange={handleInputChange}>

                <FormInput
                    name="title"
                    label="title"
                    required
                />
                <br />
                <AutoInput
                    label="Category"
                    name="category"
                    type="text"
                    list={categories}
                    required
                />
                <br />
                <FileUpload
                    label="Image"
                    name="image"
                    type="image"
                    multiple={false}
                    required
                />
                <br />
                <FormArrayInput
                    label="hashtags"
                    name="hashtags"
                />
                <br />
                <TextEditor
                    type="content"
                    name="content"
                    required
                />

                <SelectInput
                    name="postStatus"
                    label="post status (post gonna published by default)"
                    list={["archived", "published"]}
                    size="md"
                    defaultValue="published"
                    required
                />

                <SubmitBtn
                    text="publish"
                    isSubmitting={postLoader}
                    disabled={!isFormValid} // Disable the button if the form is not valid
                />
                <br />

            </form>
        </main>
    );
};

export default AddPost;



/* 
import React, { useEffect, useState } from "react";
import {
    AutoInput,
    FileUpload,
    FormArrayInput,
    FormInput,
    SelectInput,
    TextEditor,
    SubmitBtn,
} from "../../../../helpers";

import { useAddPostMutation } from "../../../../redux/services/postsServices";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetCategoriesQuery } from "../../../../redux/services/categoryServices";
import { setCategories } from "../../../../redux/slices/categorySlice";

const AddPost = () => {
    const dispatch = useDispatch();
    const { data } = useGetCategoriesQuery();

    useEffect(() => {
        if (data) {
            dispatch(setCategories(data));
        }
    }, [dispatch, data]);

    const { categories } = useSelector((state) => state.category);

    const [addPost, { isLoading }] = useAddPostMutation();
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(1);
    const [isFormValid, setIsFormValid] = useState(false);
    const [formData, setFormData] = useState(new FormData());

    const handleInputChange = (e) => {
        const form = e.currentTarget;
        setIsFormValid(form.checkValidity());

        // Update formData with the current input value
        formData.set(e.target.name, e.target.value || e.target.files[0]);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        // If on the last step, submit the form
        if (currentStep === 3) {
            try {
                const response = await addPost(formData);
                console.log("response", response);
                navigate("/");
            } catch (error) {
                console.log(error);
            }
        } else {
            // If not on the last step, proceed to the next step
            setCurrentStep((prevStep) => prevStep + 1);
        }
    };

    return (
        <main className="grid place-content-center mt-1.5 w-56 mx-auto md:w-auto">
            <div>
                <h2 className="text-xl">Upload post</h2>
                <h5 className="text-sm mt-10">Add post - Step {currentStep}</h5>
            </div>
            <hr />
            <form className="mt-10" onSubmit={onSubmit} onChange={handleInputChange}>
                {currentStep === 1 && (
                    <>
                        <FormInput
                            name="title"
                            label="Title"
                            required
                        />
                        <br />
                        <AutoInput
                            label="Category"
                            name="category"
                            type="text"
                            list={categories}
                            required
                        />
                    </>
                )}
                {currentStep === 2 && (
                    <>
                        <FileUpload
                            label="Image"
                            name="image"
                            type="image"
                            multiple={false}
                            required
                        />
                        <br />
                    </>
                )}
                {currentStep === 3 && (
                    <>
                        <FormArrayInput
                            label="Hashtags"
                            name="hashtags"
                        />
                        <br />
                        <TextEditor
                            type="content"
                            name="content"
                        />
                        <br />
                        <SelectInput
                            name="postStatus"
                            label="Post status (post gonna published by default)"
                            list={["Archived", "Published"]}
                            size="md"
                            defaultValue="Published"
                            required
                        />
                        <br />
                    </>
                )}

                <SubmitBtn
                    text={currentStep === 3 ? "Publish" : "Next"}
                    isSubmitting={isLoading}
                    disabled={!isFormValid}
                />
                <br />
            </form>
        </main>
    );
};

export default AddPost;


*/