import { useFormik } from "formik";
import { Card } from "../components";

export function Welcome() {
  const formik = useFormik<{
    firstName: string;
    lastName: string;
    email: string;
  }>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Card>
        <div className="m-4 flex flex-col">
          <h1 className="font-bold text-lg">Welcome!</h1>
          <p>
            Let&apos;s build your profile so we can provide the best start for
            you.
          </p>
          <form onSubmit={formik.handleSubmit} className="flex flex-col w-full">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <button className="ml-auto" type="submit">
              Submit
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
}
