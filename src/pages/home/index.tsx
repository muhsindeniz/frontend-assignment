import axios from "axios";
import { useQuery } from "react-query";
import Loading from "~/components/Loading/Loading";
import { useToast } from "~/context/AppDesignContext";
import { useAppSelector } from "~/hooks/hooks";
import AppLayout from "~/layouts/AppLayout";
import { MdWorkOutline } from "react-icons/md";
import moment from "moment";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

const fetchJobs = async () => {
  const response = await axios.get<Job[]>(`${BASE_URL}/jobs`);
  return response.data;
};

interface Job {
  createdAt: string;
  companyName: string;
  location: string;
  description: string;
  salary: number;
  name: string;
  id: string;
}

const Home = () => {
  const { error } = useToast();
  const user = useAppSelector((state) => state.user);

  const { data: jobsData, isError, isLoading } = useQuery("jobs", fetchJobs);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return error({
      title: "Veri hatası",
      duration: 3000,
      position: "top-center",
    });
  }

  return (
    <AppLayout title="ACME Home">
      <div className="mt-4 flex h-app-layout w-full gap-4 overflow-y-auto">
        <div className="flex w-3/4 flex-col gap-3">
          {jobsData &&
            jobsData.map((job) => (
              <div className="flex gap-6 rounded-md bg-gray-200 p-4">
                <div className="flex w-1/2 gap-2">
                  <MdWorkOutline size={32} />
                  <div className="flex flex-1 flex-col gap-3">
                    <div className="text-lg font-medium">{job.name}</div>
                    <p>{job.companyName}</p>
                    <p>{job.salary}$</p>
                  </div>
                </div>
                <div className="flex w-1/2 gap-2">
                  <div className="">{job.description}</div>
                  <div>
                    <button
                      type="button"
                      className="mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="max-h-screen-layout fixed right-10 flex w-[300px] flex-col gap-3 overflow-y-auto rounded-md bg-gray-200 p-4">
          <div>
            {user.profilePicture !== null && (
              <img
                src={user.profilePicture}
                className="h-16 w-16 rounded-[50%] object-cover"
              />
            )}
          </div>
          <div>
            {user.name} {user.surname}
          </div>
          <div>{user.email}</div>
          <div>{user.phone}</div>
          <div>
            {user.address.country} / {user.address.city} /{" "}
            {user.address.details}
          </div>
          <h1 className="font-bold">Education</h1>
          {user.education.map((edu, index) => (
            <div className="flex flex-col gap-2" key={index}>
              <div className="font-semibold">Institution:</div>
              <div>{edu.institution}</div>
              <div className="font-semibold">Degree:</div>
              <div>{edu.degree}</div>
              <div className="font-semibold">Start Date - End Date:</div>
              <div>
                {moment(edu.startDate).format("MM-DD-yyyy")} -{" "}
                {moment(edu.endDate).format("MM-DD-yyyy")}
              </div>
            </div>
          ))}
          <div>
            <h1 className="font-bold">Experience</h1>
            {user.experience.map((exp, index) => (
              <div className="flex flex-col gap-2" key={index}>
                <div className="font-semibold">Company:</div>
                <div>{exp.company}</div>
                <div className="font-semibold">Position:</div>
                <div>{exp.position}</div>
                <div className="font-semibold">Start Date - End Date:</div>
                <div>
                  {moment(exp.startDate).format("MM-DD-yyyy")} - {" "}
                  {moment(exp.endDate).format("MM-DD-yyyy")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
