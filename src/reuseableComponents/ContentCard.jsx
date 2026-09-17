import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Badge, Row } from "antd";
import DynamicIconComponent from "./IconComponent";
import BreadCrumbsComponent from "./BreadCrumbsComponent";
import { Loading } from "./LoaderComponent";

const ContentCard = ({
    title,
    showbackArrow,
    content,
    actionItems,
    showTitle = true,
    cardHeader = true,
    contentCardStyle = {},
    isBreadCrumbsRequred = true,
    loadingCard = false,
}) => {
    const navigate = useNavigate();
    return (
        <>
            {/* <BreadCrumbsComponent showBreadCrumbs={isBreadCrumbsRequred} /> */}

            {loadingCard ? (
                <Loading />
            ) : (
                <div
                    className="rounded-lg shadow bg-[var(--color-bg)] m-2 p-1 2xl:h-[90vh] "
                    style={{ ...contentCardStyle }}
                >
                    {/* Card header */}
                    {cardHeader && (
                        <div className="flex  sm:flex-row justify-between items-start sm:items-center mx-1 ">
                            {/* Title & back button */}
                            {showTitle && (
                                <div className="flex items-center">
                                    {showbackArrow && (
                                        <DynamicIconComponent
                                            className="cursor-pointer"
                                            iconName="BsArrowLeft"
                                            color="var(--icon-color)"
                                            onclickIcon={() => navigate(-1)}
                                        />
                                    )}
                                    <span className="font-roboto-bold var(--color-text) p-2">{title}</span>
                                </div>
                            )}

                            {/* Action items */}
                            {actionItems && actionItems}
                        </div>
                    )}

                    {/* Main content */}
                    {content}
                </div>
            )}
        </>
    );
};

export default ContentCard;
