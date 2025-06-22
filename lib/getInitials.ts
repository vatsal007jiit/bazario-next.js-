function getInitials(name?: string) {
      if (!name) return '';
      const parts = name.trim().split(/\s+/); // Split by any whitespace
      const initials = parts.slice(0, 2).map(word => word[0].toUpperCase()).join('');
      return initials;
    }

    export default getInitials