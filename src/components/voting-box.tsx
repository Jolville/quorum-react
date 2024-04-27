import React, { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "./button";
import { Typography } from "./typography";
import { DesignPhase } from "../gql/graphql";
import ArrowSquareLeft from "../icons/arrow-square-left.svg?react";
import ArrowSquareRight from "../icons/arrow-square-right.svg?react";

export type VotingBoxProps = {
  post: {
    options: Array<{ id: string; url: string }>;
    designPhase?: DesignPhase;
    content?: string;
    opensAt?: Date;
    closesAt?: Date;
    author: {
      firstName: string;
      lastName: string;
    };
    activeOptionIndex: number;
    setActiveOptionIndex(i: number): void;
  };
  // Voting disabled when voteProps is empty
  voteProps?: {
    submitVoteLoading: boolean;
    onVote(optionId: string): void;
  };
};

export function VotingBox(props: VotingBoxProps) {
  const activeOption = props.post.options.at(props.post.activeOptionIndex);
  if (!activeOption) {
    throw new Error(
      `expected post option at index ${props.post.activeOptionIndex}`
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm w-full h-full flex flex-row">
      <div className="w-80 flex-none border-r p-6 border-gray-200 flex flex-col justify-between h-full">
        <div>
          <div className="flex flex-row space-x-2 mb-6">
            <Typography element="p" size="s" className="text-gray-600">
              {props.post.author.firstName} {props.post.author.lastName}
            </Typography>
            <PostedMinutesAgo opensAt={props.post.opensAt} />
          </div>
          <Typography element="p" size="m" className="text-gray-900">
            {props.post.content}
          </Typography>
        </div>
        <div className="bg-gray-100 border border-gray-300 p-4 rounded-lg flex flex-col space-y-3">
          <Typography size="s" element="p" className="text-gray-600">
            Voting results will show here once you&apos;ve voted. You must view
            all options before you can vote.
          </Typography>
          <VotingEndsIn closesAt={props.post.closesAt} />
        </div>
      </div>
      <div className="flex-grow flex flex-col h-full p-4 space-y-4">
        <div className="flex flex-row w-full justify-between items-center">
          <Button
            variant="secondary"
            size="l"
            disabled={props.post.activeOptionIndex === 0}
            onClick={() =>
              props.post.setActiveOptionIndex(props.post.activeOptionIndex - 1)
            }
          >
            <ArrowSquareLeft />
          </Button>
          <div className="flex flex-col justify-center space-y-2">
            <Typography
              element="h"
              size="s"
              style="bold"
              className="text-center"
            >
              Option {props.post.activeOptionIndex + 1} of{" "}
              {props.post.options.length}
            </Typography>
            <Button
              variant="primary"
              size="l"
              disabled={!props.voteProps}
              onClick={() => {
                if (!props.voteProps) {
                  throw new Error("expected voteProps to be set");
                }
                props.voteProps.onVote(activeOption.id);
              }}
            >
              Vote for this option
            </Button>
          </div>
          <Button
            variant="secondary"
            size="l"
            disabled={
              props.post.activeOptionIndex === props.post.options.length - 1
            }
            onClick={() =>
              props.post.setActiveOptionIndex(props.post.activeOptionIndex + 1)
            }
          >
            <ArrowSquareRight />
          </Button>
        </div>
        <div className="flex-grow overflow-y-scroll flex items-center justify-center flex-col bg-gray-100">
          <div className="flex-grow" />
          <div className="m-6">
            <img src={activeOption.url} className="max-w-96" />
          </div>
          <div className="flex-grow" />
        </div>
      </div>
    </div>
  );
}

function PostedMinutesAgo(props: { opensAt?: Date }) {
  const [postedMinutesAgo, setPostedMinutesAgo] = React.useState<string | null>(
    () => {
      if (!props.opensAt) {
        return null;
      }
      return formatDistanceToNow(props.opensAt, {
        addSuffix: true,
      });
    }
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setPostedMinutesAgo(() => {
        if (props.opensAt == null) {
          return null;
        }
        return formatDistanceToNow(props.opensAt, {
          addSuffix: true,
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [props.opensAt]);

  return (
    <>
      {postedMinutesAgo && (
        <Typography size="s" element="p" className="text-gray-400">
          {postedMinutesAgo}
        </Typography>
      )}
    </>
  );
}

function VotingEndsIn(props: { closesAt?: Date }) {
  const [votingEndsIn, setVotingEndsIn] = React.useState<string | null>(() => {
    if (!props.closesAt) {
      return null;
    }
    return formatDistanceToNow(props.closesAt, {
      addSuffix: true,
    });
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setVotingEndsIn(() => {
        if (props.closesAt == null) {
          return null;
        }
        return formatDistanceToNow(props.closesAt, {
          addSuffix: true,
          includeSeconds: true,
        });
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [props.closesAt]);

  return (
    <>
      {votingEndsIn && (
        <Typography size="s" element="p" className="text-gray-500">
          {votingEndsIn}
        </Typography>
      )}
    </>
  );
}
