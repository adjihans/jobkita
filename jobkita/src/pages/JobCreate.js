import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { POST_JOB } from "../config/schema";
import { useHistory } from "react-router";

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

  return (
    <div>
      <input
        placeholder="Company Name"
        value={form.companyName}
        onChange={(event) => onChange(event, "companyName")}
      />
      <input
        placeholder="Company Address"
        value={form.companyAddress}
        onChange={(event) => onChange(event, "companyAddress")}
      />
      <input
        placeholder="Job Title"
        value={form.jobTitle}
        onChange={(event) => onChange(event, "jobTitle")}
      />
      <input
        placeholder="Job Description"
        value={form.jobDescription}
        onChange={(event) => onChange(event, "jobDescription")}
      />
      <input
        placeholder="User Email"
        value={form.userEmail}
        onChange={(event) => onChange(event, "userEmail")}
      />
      <input
        placeholder="URL"
        value={form.applyUrl}
        onChange={(event) => onChange(event, "applyUrl")}
      />
      <button onClick={handleOnClickCreate}>Create</button>
    </div>
  );
};

export default JobCreate;
