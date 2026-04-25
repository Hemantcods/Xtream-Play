export const buildConditions = (data:any) => {
  const conditions = [];

  if (data.email) conditions.push({ email: data.email });
  if (data.phone) conditions.push({ phone: data.phone });

  return conditions;
};