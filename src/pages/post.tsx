import { useMutation, useSuspenseQuery } from "@apollo/client";
import * as uuid from "uuid";
import { graphql } from "../gql";
import { useNavigate, useParams } from "react-router-dom";
import { Button, ProgressBar, TextArea, Typography } from "../components";
import { UseFormRegisterReturn, useFieldArray, useForm } from "react-hook-form";
import UploadCloud02 from "../icons/upload-cloud-02.svg?react";
import Eye from "../icons/eye.svg?react";
import Trash from "../icons/trash.svg?react";
import { DesignPhase, UpsertPostOptionInput } from "../gql/graphql";
import clsx from "clsx";
import React from "react";
import { ToastContext } from "../components";
import { useAuth } from "../hooks";
import routes from "../routes";

const supportedFileTypes = ["image/jpeg", "image/png", "image/gif"];

export function Post() {
  const { postId } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();
  if (!postId || !uuid.validate(postId)) {
    throw new Error("expected postId to be a uuid");
  }
  const { data } = useSuspenseQuery(
    graphql(`
      query PostPage($postId: UUID!) {
        post(id: $postId) {
          id
        }
      }
    `),
    {
      variables: {
        postId,
      },
    }
  );

  const { register, handleSubmit, formState, control, setValue } = useForm<{
    designPhase: DesignPhase;
    content: string;
    options: Omit<UpsertPostOptionInput, "position">[];
  }>({
    defaultValues: {
      options: [
        {
          id: uuid.v4(),
        },
        {
          id: uuid.v4(),
        },
        {
          id: uuid.v4(),
        },
      ],
    },
  });
  const optionsFieldArray = useFieldArray({
    control,
    name: "options",
  });

  const onSubmit = (data: unknown) => console.log(data);

  React.useEffect(() => {
    if (!data.post && !auth.token) {
      navigate(routes.login);
    }
  }, [data, auth]);

  if (!data.post) {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-2 md:mt-4 bg-white m-4 p-4 md:p-8 md:max-w-3xl ml-auto mr-auto shadow-lg rounded-lg flex flex-col gap-2"
      >
        <Typography
          size="s"
          element="h"
          style="bold"
          className="text-gray-800 mb-2"
        >
          New post
        </Typography>
        <div className="flex flex-col space-2">
          <Typography
            size="xl"
            element="p"
            style="bold"
            className="text-gray-800 mb-2"
          >
            Design phase
          </Typography>
          <div className="flex flex-col md:flex-row w-full gap-1">
            <DesignPhaseOption
              adornmentClassName="bg-gray-200 border border-dashed border-gray-400"
              heading="Wireframe"
              description="No colours, more conceptual only"
              value="WIREFRAME"
              register={register("designPhase", { required: true })}
            />
            <DesignPhaseOption
              adornmentClassName="bg-primary-100"
              heading="Lo-fi"
              description="Looks closer to UI with style starting to show"
              value="LO_FI"
              register={register("designPhase", { required: true })}
            />
            <DesignPhaseOption
              adornmentClassName="hifi-block"
              heading="Hi-fi"
              description="Polished designs almost ready for handover"
              value="HI_FI"
              register={register("designPhase", { required: true })}
            />
          </div>
          <Typography
            size="s"
            element="p"
            className={clsx(
              "text-error-500",
              !formState.errors.designPhase && "invisible"
            )}
            ariaHidden={!formState.errors.designPhase}
          >
            Design phase is required
          </Typography>
        </div>
        <div className="flex flex-col space-2">
          <Typography
            size="xl"
            element="p"
            style="bold"
            className="text-gray-800 mb-2"
          >
            Context
          </Typography>
          <TextArea
            {...register("content", {
              required: "Content is required",
            })}
            error={formState.errors["content"]}
            placeholder="Text goes here"
            rows={5}
            showCharacterCount
            maxLength={350}
          />
        </div>
        <Typography
          size="xl"
          element="p"
          style="bold"
          className="text-gray-800 mb-2"
        >
          Designs
        </Typography>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          {optionsFieldArray.fields.map((field, i) => (
            <DesignOption
              id={field.id}
              setValue={(filePath: string) =>
                setValue(`options.${i}.filePath`, filePath)
              }
              index={i}
              key={field.id}
            />
          ))}
        </div>
        <div className="flex flex-row">
          <Button size="m" disabled={!formState.errors} type="submit">
            Post
          </Button>
        </div>
      </form>
    );
  }

  return (
    <p className="font-normal">
      {postId}: {data.post?.id}
    </p>
  );
}

function DesignPhaseOption(props: {
  adornmentClassName: string;
  heading: string;
  description: string;
  register: UseFormRegisterReturn<"designPhase">;
  value: DesignPhase;
}) {
  return (
    <label
      htmlFor={props.value}
      className={`flex flex-col justify-center items-center cursor-pointer p-4 flex-1 border has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50 rounded border-gray-300 hover:bg-primary-25`}
    >
      <div
        className={`${props.adornmentClassName} w-10 h-10 cursor-pointer`}
        aria-hidden
      ></div>
      <Typography
        size="l"
        element="p"
        style="bold"
        className="text-gray-800 mt-2 cursor-pointer"
      >
        {props.heading}
      </Typography>
      <Typography
        size="s"
        element="p"
        className="text-gray-500 mt-2 cursor-pointer text-center"
      >
        {props.description}
      </Typography>
      <input
        id={props.value}
        type="radio"
        className="hidden"
        {...props.register}
      />
    </label>
  );
}

function DesignOption(props: {
  id: string;
  setValue: (filePath: string) => void;
  index: number;
}) {
  const [objectUrl, setObjectUrl] = React.useState<string | null>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const toastContext = React.useContext(ToastContext);

  const [generateSignedUrl, { loading: generateSignedUrlLoading }] =
    useMutation(
      graphql(`
        mutation GenerateSignedPostOptionUrl(
          $input: GenerateSignedPostOptionUrInput!
        ) {
          generateSignedPostOptionUrl(input: $input) {
            url
            bucketName
            errors {
              ... on BaseError {
                message
              }
            }
          }
        }
      `)
    );

  const [fileUploading, setFileUploading] = React.useState(false);
  const [fileUploadProgress, setFileUploadProgress] = React.useState(0);

  React.useEffect(() => {
    if (file) {
      // TODO throw if too big
      setObjectUrl(URL.createObjectURL(file));
      generateSignedUrl({
        variables: {
          input: {
            contentType: "text/plain;charset=UTF-8",
            fileName: file.name,
          },
        },
      })
        .then((resp) => {
          if (resp.data?.generateSignedPostOptionUrl) {
            setFileUploading(true);
            setFileUploadProgress(0);
            const reader = new FileReader();
            const xhr = new XMLHttpRequest();
            xhr.onerror = (e) => {
              throw e;
            };
            reader.onload = (e) => {
              xhr.send(e.target?.result);
            };
            xhr.upload.addEventListener(
              "progress",
              (e) => {
                if (e.lengthComputable) {
                  const percentage = Math.round((e.loaded * 100) / e.total);
                  setFileUploadProgress(percentage);
                }
              },
              false
            );
            xhr.upload.addEventListener(
              "load",
              () => {
                setFileUploadProgress(100);
                setFileUploading(false);
              },
              false
            );
            xhr.open("PUT", resp.data.generateSignedPostOptionUrl.url);
            xhr.overrideMimeType("text/plain; charset=x-user-defined-binary");
            xhr.onerror = (err) => {
              throw err;
            };
            reader.readAsBinaryString(file);
          }
        })
        .catch(() => {
          toastContext.addToast({
            level: "error",
            title: "There was an error uploading your file",
            description: "Please refresh the page and try again.",
          });
        });
    } else {
      setObjectUrl(null);
    }
  }, [file]);

  if (objectUrl) {
    return (
      <div className="rounded-lg border border-gray-300 flex flex-row md:flex-col space-x-2 space-y-2 items-center justify-center p-4 h-44 md:h-80">
        <div className="rounded-lg bg-gray-200 w-full h-full p-1 flex-grow flex items-center justify-center relative">
          <img
            src={objectUrl}
            onLoad={() => URL.revokeObjectURL(objectUrl)}
            className={clsx(
              "max-h-28 md:max-h-32 max-w-32 md:max-w-40",
              (generateSignedUrlLoading || fileUploading) && "opacity-50"
            )}
          />
          {generateSignedUrlLoading ||
            (fileUploading && (
              <div className="absolute bottom-2 w-full px-2">
                <ProgressBar percentage={fileUploadProgress} />
              </div>
            ))}
        </div>
        <div className="flex flex-col items-center justify-center min-w-24 h-full md:h-auto md:w-full space-y-2">
          <Typography
            element="p"
            size="l"
            style="bold"
            className="text-left w-full mb-2"
          >
            Option #{props.index + 1}
          </Typography>
          <Button
            variant="secondary"
            size="s"
            className="w-full font-bold"
            type="button"
          >
            <span className="flex flex-row items-center justify-center space-x-1">
              <Eye />
              <span>Preview</span>
            </span>
          </Button>
          <Button
            variant="destructive-secondary"
            size="s"
            className="w-full font-bold"
            type="button"
          >
            <span className="flex flex-row items-center justify-center space-x-1">
              <Trash />
              <span>Remove</span>
            </span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <label
        htmlFor={props.id}
        className="rounded-lg border border-primary-500 border-dashed flex flex-col space-y-4 items-center justify-center h-44 md:h-80 cursor-pointer"
        onDragEnter={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onDragOver={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.stopPropagation();
          e.preventDefault();
          const droppedFile = e.dataTransfer.files[0];
          if (droppedFile && supportedFileTypes.includes(droppedFile.type)) {
            setFile(droppedFile);
          }
        }}
      >
        <div
          className="h-10 w-10 rounded border border-gray-200 shadow-xs flex items-center justify-center text-gray-600"
          aria-hidden
        >
          <UploadCloud02 />
        </div>
        <div className="flex flex-col space-y-2 text-center">
          <Typography size="s" element="p" className="text-gray-700">
            <strong className="text-primary-500">Click to Upload</strong> or
            <br />
            drag and drop
          </Typography>
          <Typography size="xs" element="p" className="text-gray-500">
            PNG, JPG or GIF
            <br />
            (5MB max file size)
          </Typography>
        </div>
      </label>
      <input
        type="file"
        id={props.id}
        name={props.id}
        accept=".png,.jpeg,.gif"
        className="hidden"
        onChange={(e) => {
          const targetFile = e.target.files?.[0];
          if (!targetFile) {
            throw new Error("expected file to be non-null");
          }
          setFile(targetFile);
        }}
      />
    </div>
  );
}
