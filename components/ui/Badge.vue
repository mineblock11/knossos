<template>
  <span :class="'version-badge ' + color + ' type--' + type">
    <template v-if="color"> <span class="circle" /> {{ $capitalizeString(type) }} </template>

    <!-- User roles -->
    <template v-else-if="type === 'admin'"> <ModrinthIcon /> Modrinth Team </template>
    <template v-else-if="type === 'moderator'"> <ModeratorIcon /> Moderator </template>
    <template v-else-if="type === 'creator'"><CreatorIcon /> Creator</template>

    <!-- Project statuses -->
    <template v-else-if="type === 'approved'"><ListIcon /> Listed</template>
    <template v-else-if="type === 'unlisted'"><EyeOffIcon /> Unlisted</template>
    <template v-else-if="type === 'withheld'"><EyeOffIcon /> Withheld</template>
    <template v-else-if="type === 'private'"><LockIcon /> Private</template>
    <template v-else-if="type === 'scheduled'"> <CalendarIcon /> Scheduled </template>
    <template v-else-if="type === 'draft'"><DraftIcon /> Draft</template>
    <template v-else-if="type === 'archived'"> <ArchiveIcon /> Archived </template>
    <template v-else-if="type === 'rejected'"><CrossIcon /> Rejected</template>
    <template v-else-if="type === 'processing'"> <ProcessingIcon /> Under review </template>

    <!-- Team members -->
    <template v-else-if="type === 'accepted'"><CheckIcon /> Accepted</template>
    <template v-else-if="type === 'pending'"> <ProcessingIcon /> Pending </template>

    <!-- Transaction statuses -->
    <template v-else-if="type === 'success'"><CheckIcon /> Success</template>

    <!-- Other -->
    <template v-else> <span class="circle" /> {{ $capitalizeString(type) }} </template>
  </span>
</template>

<script>
import ModrinthIcon from '~/assets/images/logo.svg'
import ModeratorIcon from '~/assets/images/sidebar/admin.svg'
import CreatorIcon from '~/assets/images/utils/box.svg'
import ListIcon from '~/assets/images/utils/list.svg'
import EyeOffIcon from '~/assets/images/utils/eye-off.svg'
import DraftIcon from '~/assets/images/utils/file-text.svg'
import CrossIcon from '~/assets/images/utils/x.svg'
import ArchiveIcon from '~/assets/images/utils/archive.svg'
import ProcessingIcon from '~/assets/images/utils/updated.svg'
import CheckIcon from '~/assets/images/utils/check.svg'
import LockIcon from '~/assets/images/utils/lock.svg'
import CalendarIcon from '~/assets/images/utils/calendar.svg'

export default {
  components: {
    ModrinthIcon,
    ListIcon,
    DraftIcon,
    EyeOffIcon,
    ModeratorIcon,
    CreatorIcon,
    CrossIcon,
    ArchiveIcon,
    ProcessingIcon,
    CheckIcon,
    LockIcon,
    CalendarIcon,
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.version-badge {
  display: flex;
  align-items: center;
  font-weight: bold;
  width: fit-content;
  --badge-color: var(--color-special-gray);
  color: var(--badge-color);

  .circle {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    display: inline-block;
    margin-right: 0.25rem;
    background-color: var(--badge-color);
  }

  svg {
    margin-right: 0.25rem;
  }

  &.type--withheld,
  &.type--rejected,
  &.red {
    --badge-color: var(--color-special-red);
  }

  &.type--pending,
  &.type--moderator,
  &.type--processing,
  &.type--scheduled,
  &.orange {
    --badge-color: var(--color-special-orange);
  }

  &.type--accepted,
  &.type--admin,
  &.type--success,
  &.green {
    --badge-color: var(--color-special-green);
  }

  &.type--creator,
  &.type--approved,
  &.blue {
    --badge-color: var(--color-special-blue);
  }

  &.type--unlisted,
  &.purple {
    --badge-color: var(--color-special-purple);
  }

  &.type--private,
  &.gray {
    --badge-color: var(--color-special-gray);
  }
}
</style>
