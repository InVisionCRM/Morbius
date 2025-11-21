import type { ReactionCounts, ReactionType } from '@/types/messages';

export const REACTION_CONFIG = [
  { type: 'THUMBS_UP', emoji: '👍', label: 'Thumbs Up' },
  { type: 'HEART', emoji: '❤️', label: 'Heart' },
  { type: 'LAUGH', emoji: '😂', label: 'Laugh' },
  { type: 'THUMBS_DOWN', emoji: '👎', label: 'Thumbs Down' },
  { type: 'ANGRY', emoji: '😡', label: 'Angry' },
] as const satisfies readonly { type: ReactionType; emoji: string; label: string }[];

export const REACTION_TYPES: ReactionType[] = REACTION_CONFIG.map(
  (reaction) => reaction.type
) as ReactionType[];

export function createEmptyReactionCounts(): ReactionCounts {
  return REACTION_TYPES.reduce((acc, type) => {
    acc[type] = 0;
    return acc;
  }, {} as ReactionCounts);
}

export function buildReactionCounts(
  reactions: { reaction_type: ReactionType; count: number }[]
): ReactionCounts {
  const counts = createEmptyReactionCounts();
  for (const reaction of reactions) {
    counts[reaction.reaction_type] = reaction.count;
  }
  return counts;
}
