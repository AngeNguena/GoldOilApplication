
import React from "react";
import { usePage } from "@inertiajs/react";
import Navbar from "./Navbar.jsx";

const Layout = ({
  children,
  title = "Inventory Management",
}) => {
  const { flash } = usePage().props;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Navbar */}
      <Navbar />

      {/* Flash Messages */}
      {flash?.messages?.length > 0 && (
        <div className="w-full px-4 pt-4 sm:px-6 md:px-8 lg:px-10">
          <div className="max-w-7xl mx-auto space-y-3">

            {flash.messages.map((item, index) => {

              const messageStyles = {
                success: {
                  background: "#EEF3EC",
                  border: "#C8D6C4",
                  text: "#3F513B",
                  dot: "#65785F",
                },

                error: {
                  background: "#F7EDEC",
                  border: "#D9B8B4",
                  text: "#6B1A1A",
                  dot: "#6B1A1A",
                },

                warning: {
                  background: "#F5F0E5",
                  border: "#DCCBA5",
                  text: "#765F2A",
                  dot: "#9A7B35",
                },

                info: {
                  background: "#F1EEEA",
                  border: "#D8D0C7",
                  text: "#514942",
                  dot: "#8C847C",
                },
              };

              const style =
                messageStyles[item.level] ||
                messageStyles.info;

              return (
                <div
                  key={index}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg"
                  style={{
                    backgroundColor: style.background,
                    border: `1px solid ${style.border}`,
                    color: style.text,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >

                  {/* Indicator */}
                  <span
                    className="flex-shrink-0 w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: style.dot,
                    }}
                  />

                  {/* Message */}
                  <span className="leading-relaxed">
                    {item.message}
                  </span>

                </div>
              );
            })}

          </div>
        </div>
      )}

      {/* Page Content */}
      <main className="flex-1 w-full px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8 lg:px-10">

        <div className="max-w-7xl mx-auto w-full">

          {/* Page Title */}
          {title && (
            <h1
              className="
                text-xl
                sm:text-2xl
                md:text-3xl
                font-bold
                mb-4
                sm:mb-6
                text-gray-900
                break-words
              "
            >
              {title}
            </h1>
          )}

          {/* Page Content */}
          <div className="w-full overflow-x-auto">
            {children}
          </div>

        </div>

      </main>

    </div>
  );
};

export default Layout;

