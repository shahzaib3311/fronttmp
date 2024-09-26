export const mobileNavContainerVariant = {
  hidden: {
    opacity: 0,
    y: '-100%',
  },
  show: {
    opacity: 1,
    y: '0%',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
};

export const mobileNavListVariant = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
      staggerChildren: 0.1,
    },
  },
};

export const mobileNavExitProps = {
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};
