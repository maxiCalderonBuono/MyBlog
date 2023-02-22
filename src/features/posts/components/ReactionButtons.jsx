import { Button, Flex } from "@chakra-ui/react";
import { useAddReactionMutation } from "../../../store/slices";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

export const ReactionButtons = ({ post }) => {
  const [addReaction] = useAddReactionMutation();

  const reactions = post.reactions[0];

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <Button
        key={name}
        type="button"
        size="sm"
        variant="ghost"
        onClick={() => {
          const newValue = reactions[name] + 1;
          addReaction({
            postId: post.id,
            reactions: [{ ...reactions, [name]: newValue }],
          });
        }}
      >
        {reactions[name]}&nbsp;
        {emoji}
      </Button>
    );
  });

  return <Flex mt="3">{reactionButtons}</Flex>;
};
