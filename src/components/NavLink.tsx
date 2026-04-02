import { Link as RouterNavLink, LinkProps } from "@tanstack/react-router";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<LinkProps, "className"> {
    className?: string;
    activeClassName?: string;
    pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
    ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
        return (
            <RouterNavLink
                ref={ref}
                to={to}
                className={cn(className)}
                activeProps={{
                    className: cn(className, activeClassName),
                }}
                // Note: React Router doesn't have a built-in concept of "pending" like Remix, so this is just for demonstration. You would need to implement your own logic to determine when a link is pending.
                inactiveProps={{
                    className: cn(className, pendingClassName),
                }}
                {...props}
            />
        );
    },
);

NavLink.displayName = "NavLink";

export { NavLink };
