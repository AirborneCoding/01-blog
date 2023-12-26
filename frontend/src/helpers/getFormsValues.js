// const getFormValues = (formData) => {
//   // Convert File objects to base64 strings
//   formData.forEach((value, key) => {
//     if (value instanceof File) {
//       formData.set(key, value);
//     }
//   });

//   const nonEmptyFormData = [...formData.entries()].filter(([key, value]) => {
//     return (
//       typeof value === 'string' ||
//       (typeof value === 'object' && value !== null && ('trim' in value || value instanceof File))
//     );
//   });

//   const data = Object.fromEntries(nonEmptyFormData);
//   const filteredData = Object.keys(data).reduce((acc, key) => {
//     if (data[key] !== undefined && data[key] !== '') {
//       acc[key] = data[key];
//     }
//     return acc;
//   }, {});

//   const isEmpthy = Object.keys(filteredData).length === 0;

//   return { isEmpthy, data: filteredData };
// };

// export default getFormValues;


const getFormValues = (form, requiredFields = []) => {


  const formData = new FormData(form)
  const values = [...formData.values()]
  const isEmpthy = values.includes("")
  const data = Object.fromEntries(formData)

  // const formData = new FormData(form);
  // const nonEmptyFormData = [...formData.entries()].filter(([key, value]) => {
  //   return (
  //     typeof value === 'string' ||
  //     (typeof value === 'object' && value !== null && ('trim' in value || value instanceof File))
  //   );
  // });

  // const data = Object.fromEntries(nonEmptyFormData);
  // const filteredData = Object.keys(data).reduce((acc, key) => {
  //   if (data[key] !== undefined && data[key] !== '') {
  //     acc[key] = data[key];
  //   }
  //   return acc;
  // }, {});

  // const isEmpthy = Object.keys(filteredData).length === 0;

  return { isEmpthy, data };
};

export default getFormValues;
