import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { money } from '../assets';
import { CustomButton, FormField } from '../components';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  });

  const handleChange = (e, name) => {
    setForm({ ...form, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };

  return (
    <div className="bg-secondary flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && 'Loading...'}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            label="Your Name *"
            placeholder="John Doe"
            type="text"
            value={form.name}
            onChange={(e) => handleChange(e, 'name')}
          />
          <FormField
            label="Campaign Title *"
            placeholder="Write a title"
            type="text"
            value={form.title}
            onChange={(e) => handleChange(e, 'title')}
          />
        </div>
        <FormField
          label="Story *"
          placeholder="Write your story"
          isArea
          value={form.description}
          onChange={(e) => handleChange(e, 'description')}
        />

        <div className="w-full flex justify-start items-center p-4 bg-[#866dfd] h-[120px] rounded-[10px]">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
            You will get 100% of the raised amount
          </h4>
        </div>
        <FormField
          label="Goal *"
          placeholder="ETH 0.50"
          type="number"
          value={form.target}
          onChange={(e) => handleChange(e, 'target')}
        />
        <FormField
          label="End Date *"
          placeholder="End Date"
          type="date"
          value={form.deadline}
          onChange={(e) => handleChange(e, 'deadline')}
        />
        <FormField
          label="Campaign image *"
          placeholder="Place image url of your campaign"
          type="url"
          value={form.image}
          onChange={(e) => handleChange(e, 'image')}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            type="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
