'use client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import FormField from '../../components/FormField';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface SchoolForm {
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  image: FileList;
}

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<SchoolForm>();

  const [loading, setLoading] = useState(false);
  const image = watch('image');
  const router = useRouter();

  const onSubmit = async (data: SchoolForm) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('address', data.address);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('contact', data.contact);
    formData.append('email_id', data.email_id);
    if (data.image && data.image[0]) formData.append('image', data.image[0]);

    try {
      setLoading(true);
      const res = await fetch('/api/schools', { method: 'POST', body: formData });

      if (!res.ok) throw new Error('Failed to add school');
      toast.success('School added successfully!');

      reset();

      router.push('/showSchools'); 
    } catch (err) {
      console.error('Submit error:', err);
      toast.error('Failed to add school. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-custom text-custom transition-colors duration-300">
      <div className="w-full max-w-lg bg-card rounded-2xl shadow-lg p-6 md:p-8 space-y-6 border border-custom">
        <h1 className="text-3xl font-bold text-center text-card">Add School</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField label="Name" id="name" register={register} error={errors.name} placeholder="Enter school name" required />
          <FormField label="Address" id="address" register={register} error={errors.address} placeholder="Enter school address" required />
          <FormField label="City" id="city" register={register} error={errors.city} placeholder="Enter city" required />
          <FormField label="State" id="state" register={register} error={errors.state} placeholder="Enter state" required />
          <FormField label="Contact" id="contact" type="tel" register={register} error={errors.contact} placeholder="Enter contact number" required />
          <FormField label="Email" id="email_id" type="email" register={register} error={errors.email_id} placeholder="Enter email" required />

          {/* File Upload */}
          <div className="flex flex-col">
            <label htmlFor="image" className="mb-2 font-medium text-card">
              School Image
            </label>
            <div className="relative">
              <input
                type="file"
                id="image"
                accept="image/*"
                {...register('image')}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="file-upload-area">
                {image && image[0] ? (
                  <p className="text-green-600 dark:text-green-400">{image[0].name}</p>
                ) : (
                  <p className="text-file-upload">Click to upload or drag and drop</p>
                )}
              </div>
            </div>
            <p className="text-xs text-file-upload mt-1">PNG, JPG, JPEG up to 5MB</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="submit-button flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Submitting...
              </>
            ) : (
              'Submit'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
