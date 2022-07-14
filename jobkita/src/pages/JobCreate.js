import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { POST_JOB } from "../config/schema";
import { useHistory } from "react-router";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { toast } from "react-toastify";

export const JobCreate = () => {
  const history = useHistory();
  const [form, setForm] = useState({
    companyName: "",
    companyAddress: "",
    jobTitle: "",
    jobDescription: "",
    userEmail: "",
    applyUrl: "",
  });
  const [createJob, { data, loading, error }] = useMutation(POST_JOB);

  const onChange = (event, filter) => {
    const value = event.target.value;
    let tempForm = { ...form };
    switch (filter) {
      case "companyName":
        tempForm.companyName = value;
        break;
      case "companyAddress":
        tempForm.companyAddress = value;
        break;
      case "jobTitle":
        tempForm.jobTitle = value;
        break;
      case "userEmail":
        tempForm.userEmail = value;
        break;
      case "applyUrl":
        tempForm.applyUrl = value;
        break;
      default:
        tempForm.jobDescription = value;
    }
    setForm(tempForm);
  };

  const handleOnClickCreate = async () => {
    await createJob({
      variables: {
        input: {
          title: form.jobTitle,
          companyName: form.companyName,
          locationNames: form.companyAddress,
          description: form.jobDescription,
          applyUrl: form.applyUrl,
          userEmail: form.userEmail,
          commitmentId: "cjtu8esth000z0824x00wtp1i",
        },
      },
    });
  };

  useEffect(() => {
    if (error) {
      return toast.error(`${error}`);
    }
    if (data) {
      toast.success("Job is successfully create", {
        onClose: () => setTimeout(() => history.replace("/job"), 1000),
      });
    }
  }, [data, error]);

  return (
    <JobContainer>
      <Navbar showBorder={true} backgroundColor="#fff" />
      <div className="job-form">
        <div className="job-form-title">Post Your Job</div>
        <div className="job-form-container">
          <input
            className="input-form"
            placeholder="Company Name"
            value={form.companyName}
            onChange={(event) => onChange(event, "companyName")}
          />
          <input
            className="input-form"
            placeholder="Company Address"
            value={form.companyAddress}
            onChange={(event) => onChange(event, "companyAddress")}
          />
          <input
            className="input-form"
            placeholder="Job Title"
            value={form.jobTitle}
            onChange={(event) => onChange(event, "jobTitle")}
          />
          <input
            className="input-form"
            placeholder="User Email"
            value={form.userEmail}
            onChange={(event) => onChange(event, "userEmail")}
          />
          <input
            className="input-form"
            placeholder="URL"
            value={form.applyUrl}
            onChange={(event) => onChange(event, "applyUrl")}
          />
          <textarea
            className="text-area-form"
            placeholder="Job Description"
            value={form.jobDescription}
            onChange={(event) => onChange(event, "jobDescription")}
          />
          <button className="submit-button" onClick={handleOnClickCreate}>
            Create
          </button>
        </div>
      </div>
    </JobContainer>
  );
};

export default JobCreate;

const JobContainer = styled.div`
  width: 100%;
  .job-form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    color: #25282b;

    .job-form-title {
      font-weight: bold;
      font-size: 50px;
      margin: 8px;
    }

    .job-form-container {
      display: flex;
      flex-direction: column;

      .input-form {
        width: 330px;
        height: 50px;
        margin: 8px;
        border: 2px solid #25282b;
        border-radius: 8px;
        font-size: 20px;
      }

      .text-area-form {
        width: 330px;
        height: 75px;
        margin: 8px;
        border: 2px solid #25282b;
        border-radius: 8px;
        font-size: 20px;
      }

      .submit-button {
        width: 200px;
        height: 45px;
        margin: 8px;
        background-color: #f15e75;
        font-weight: bold;
        padding: 12px;
        border-radius: 8px;
        border: #fff;
        font-size: 16px;

        cursor: pointer;

        &:hover {
          background-color: #f78da7;
        }
      }
    }
  }
`;
