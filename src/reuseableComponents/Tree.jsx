import React, { useEffect, useMemo, useState } from "react";
import { Tree, Tag, Input } from "antd";
import { ApartmentOutlined, BankOutlined, CaretDownOutlined, DownOutlined, UserOutlined, EnvironmentOutlined } from "@ant-design/icons";
import ButtonComponent from "./ButtonComponent";
import DynamicIconComponent from "./IconComponent";

/* ---------- status/type color helpers ---------- */

export const statusColor = (status) => (status === "Active" ? "green" : "red");

export const typeColor = (type) => {
    switch (type) {
        case "Group Company":
            return "purple";
        case "Company":
            return "blue";

        case "Deputed Company":
            return "gold";
        default:
            return "default";
    }
};

export const typeIcon = (type) => {
    switch (type) {
        case "Group Company":
            return <ApartmentOutlined />;
        case "Company":
            return <BankOutlined />;

        case "Deputed Company":
            return <EnvironmentOutlined />;
        default:
            return "default";
    }
};

// Convert our plain data shape into antd's Tree `treeData` shape (title/key/children),
// with a custom-rendered title so we can show code + type + status tags inline.
const buildTreeData = (nodes) =>
    nodes.map((node) => ({
        key: node.key,
        title: (
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 flex-wrap py-0.5">
                    {typeIcon(node?.type)}
                    <span className="font-medium text-gray-800">{node.name}</span>
                    <Tag color="default" className="m-0! text-[11px]!">
                        {node.code}
                    </Tag>
                    <Tag color={typeColor(node.type)} className="m-0! text-[11px]!">
                        {node.type}
                    </Tag>
                    <Tag color={statusColor(node.status)} style={{ fontSize: "10px" }} className="m-0! text-[11px]!">
                        {node.status}
                    </Tag>
                </div>
                <div className="flex items-center gap-2 flex-wrap py-0.5">
                    <span>
                        <DynamicIconComponent iconName="FaPlus" iconSize="" color="green" />
                    </span>
                    <span>
                        <DynamicIconComponent iconName="AiOutlineEdit" iconSize="" color="skyblue" />
                    </span>
                    <span>
                        <DynamicIconComponent iconName="FaRegEye" iconSize="" color="skyblue" />
                    </span>
                    <span>
                        <DynamicIconComponent iconName="CiTrash" iconSize="" color="red" />
                    </span>

                </div>
            </div>
        ),
        // _raw: node,
        children: node.children ? buildTreeData(node.children) : undefined,
    }));

// Collect every key in the tree (used for "expand all")
const collectAllKeys = (nodes, acc = []) => {
    nodes.forEach((node) => {
        acc.push(node.key);
        if (node.children) collectAllKeys(node.children, acc);
    });
    return acc;
};

// Simple case-insensitive search filter — returns only branches that match
// (a parent stays visible if any descendant matches).
const filterTree = (nodes, query) => {
    if (!query) return nodes;
    const q = query.toLowerCase();

    const walk = (list) =>
        list
            .map((node) => {
                const matchesSelf =
                    node.name.toLowerCase().includes(q) ||
                    node.code.toLowerCase().includes(q) ||
                    node.type.toLowerCase().includes(q);

                const filteredChildren = node.children ? walk(node.children) : [];

                if (matchesSelf || filteredChildren.length) {
                    return { ...node, children: filteredChildren.length ? filteredChildren : node.children };
                }
                return null;
            })
            .filter(Boolean);

    return walk(nodes);
};

const CompanyTree = ({ data = sampleCompanyData, onSelect, searchable = true, defaultExpandAll = false }) => {
    const allKeys = useMemo(() => collectAllKeys(data), [data]);
    const [expandedKeys, setExpandedKeys] = useState(defaultExpandAll ? allKeys : []);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [query, setQuery] = useState("");
    const [toggleNodes, setToggleNodes] = useState(false);

    const filteredData = useMemo(() => filterTree(data, query), [data, query]);
    const treeData = useMemo(() => buildTreeData(filteredData), [filteredData]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);
        setExpandedKeys(collectAllKeys(filterTree(data, value)));
        setAutoExpandParent(true);
    };

    const handleExpand = (keys) => {
        setExpandedKeys(keys);
        setAutoExpandParent(false);
    };

    const handleSelect = (_selectedKeys, info) => {
        onSelect?.(info.node._raw, info);
    };

    return (
        <div className="space-y-1">
            <div className="bg-white rounded border flex justify-between items-center border-b border-gray-200  p-1">
                {searchable && (
                    <Input.Search
                        placeholder="Search by name, code, or type..."
                        allowClear
                        value={query}
                        onChange={handleSearch}
                        // className="mb-3"
                        style={{ width: "300px" }}
                    />
                )}
                <ButtonComponent
                    ButtonName={toggleNodes ? "Collapse ALL" : "Expand ALL"}
                    onclickButton={() => {
                        setToggleNodes(!toggleNodes);
                        setExpandedKeys(!toggleNodes ? allKeys : []);
                    }}
                    variant="outlined"
                />
            </div>

            <div className="bg-white rounded border border-gray-200 p-4 max-h-80 overflow-y-auto">
                <Tree
                    showIcon
                    switcherIcon={<CaretDownOutlined />}
                    treeData={treeData}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                    onExpand={handleExpand}
                    onSelect={handleSelect}
                    blockNode
                    showLine
                />
            </div>
        </div>
    );
};

export default CompanyTree;
