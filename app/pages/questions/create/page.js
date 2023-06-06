import React from 'react';
import TextEditor from '@/app/components/TextEditor';
import { NativeSelect, TextInput } from '@mantine/core';
import { IconLink } from '@tabler/icons-react';
import { data } from '../../../constants/question.data';
import DropzoneImage from '@/app/components/Dropzone';
import { useForm } from '@mantine/form';

const CreateQuestion = () => {
  const form = useForm({
    initialValues: data.map((item) => ({ [item.key]: '' })),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="flex flex-col space-y-5">
      <h1 className="text-4xl font-bold text-gray-500 mb-5">Create Question</h1>
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="flex flex-col space-y-5"
      >
        {data.map((item) => (
          <div key={item.id} className="flex flex-col space-y-2">
            {!item.dropdown && (
              <label
                htmlFor={item.key}
                className="text-gray-500 font-semibold text-md"
              >
                {item.title}
              </label>
            )}
            {item.editor && (
              <TextEditor
                content={form.values[item.key]}
                onChange={(value) => form.setFieldValue(item.key, value)}
              />
            )}
            {!item.editor && !item.dropdown && !item.image && (
              <TextInput
                id={item.key}
                type={item.type}
                value={form.values[item.key]}
                onChange={(event) =>
                  form.setFieldValue(item.key, event.currentTarget.value)
                }
                rightSection={item.link && <IconLink size="1rem" />}
              />
            )}
            {item.image && <DropzoneImage />}
            {item.dropdown && (
              <div className="flex items-center">
                <label className="w-1/3" htmlFor={item.key}>
                  {item.title}
                </label>
                <div className="w-2/3">
                  <NativeSelect
                    id={item.key}
                    data={item.data}
                    value={form.values[item.key]}
                    onChange={(event) =>
                      form.setFieldValue(item.key, event.currentTarget.value)
                    }
                    placeholder="Select option"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        <div className="pt-5 w-full flex justify-end">
          <button
            type="submit"
            className="bg-appBlue text-white px-5 py-2 rounded"
          >
            Create Question
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuestion;
