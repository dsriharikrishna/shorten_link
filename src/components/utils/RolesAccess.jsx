import LocationIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";

// Overview titles based on role
export const roleOverviewTitles = {
  MLA: "Constituency Overview",
  Mandal_Coordinator: "Mandal Overview",
  "Village Leader": "Village Overview",
  "Ward Member": "Ward Overview",
  NRI: "NRI Overview",
};

// Example: pass constituencyData, mandal, village, etc. as arguments
const getDashboardHeaders = (
  role,
  { constituencyData = {}, mandal = [], village = [] } = {}
) => {
  switch (role) {
    case "MLA":
      return {
        stats: [
          {
            label: "Total Mandals",
            value: constituencyData.mandal_count || mandal.length,
            bottominfo: `All mandals across ${
              constituencyData.district || "district"
            }`,
            icon: <LocationIcon />,
          },
          {
            label: "Total Villages",
            value:
              constituencyData.total_villages_in_constituency || village.length,
            bottominfo: `All villages across ${
              constituencyData.district || "district"
            }`,
            icon: <LocationIcon />,
          },
          {
            label: "Registered Voters",
            value: constituencyData.total_voters || "2,50,000",
            bottominfo: "As per latest electoral rolls",
            icon: <PeopleIcon />,
          },
          {
            label: "Cadre Members",
            value: constituencyData.total_cadre || "4800",
            bottominfo: "Active party members",
            icon: <PeopleIcon />,
          },
        ],
        tabData: [
          {
            label: "Overall",
            content: "Overview of constituency statistics and key metrics.",
          },
          {
            label: "Mandal",
            content: "Detailed information about mandals in the constituency.",
          },
          { label: "Village", content: "Village-level data and insights." },
          {
            label: "Voters",
            content:
              "Demographics, voting history, and participation trends of the registered voters.",
          },
        ],
      };
    case "Mandal_Coordinator":
      return {
        stats: [
          {
            label: "Total Villages",
            value: constituencyData.total_villages_in_mandal || village.length,
            bottominfo: `All villages in this mandal`,
            icon: <LocationIcon />,
          },
          {
            label: "Registered Voters",
            value: constituencyData.total_voters || "50,000",
            bottominfo: "As per latest electoral rolls",
            icon: <PeopleIcon />,
          },
          {
            label: "Cadre Members",
            value: constituencyData.total_cadre || "1200",
            bottominfo: "Active party members",
            icon: <PeopleIcon />,
          },
        ],
        tabData: [
          { label: "Overview", content: "Mandal statistics and key metrics." },
          { label: "Village", content: "Village-level data and insights." },
          { label: "Voters", content: "Voter details for this mandal." },
        ],
      };
    case "Village_Leader":
      return {
        stats: [
          {
            label: "Total Wards",
            value: constituencyData.total_wards_in_village || "10",
            bottominfo: `All wards in this village`,
            icon: <LocationIcon />,
          },
          {
            label: "Registered Voters",
            value: constituencyData.total_voters || "5,000",
            bottominfo: "As per latest electoral rolls",
            icon: <PeopleIcon />,
          },
          {
            label: "Cadre Members",
            value: constituencyData.total_cadre || "200",
            bottominfo: "Active party members",
            icon: <PeopleIcon />,
          },
        ],
        tabData: [
          { label: "Overview", content: "Village statistics and key metrics." },
          { label: "Ward", content: "Ward-level data and insights." },
          { label: "Voters", content: "Voter details for this village." },
        ],
      };
    case "Ward_Member":
      return {
        stats: [
          {
            label: "Registered Voters",
            value: constituencyData.total_voters || "1,000",
            bottominfo: "As per latest electoral rolls",
            icon: <PeopleIcon />,
          },
          {
            label: "Cadre Members",
            value: constituencyData.total_cadre || "50",
            bottominfo: "Active party members",
            icon: <PeopleIcon />,
          },
        ],
        tabData: [
          { label: "Overview", content: "Ward statistics and key metrics." },
          { label: "Voters", content: "Voter details for this ward." },
        ],
      };
    case "NRI":
      return {
        stats: [
          {
            label: "Registered NRIs",
            value: constituencyData.total_nris || "500",
            bottominfo: "NRIs registered from this region",
            icon: <PeopleIcon />,
          },
        ],
        tabData: [
          { label: "Overview", content: "NRI statistics and participation." },
        ],
      };
    default:
      return {
        stats: [],
        tabData: [],
      };
  }
};

// Utility function to get the overview title for a given role
export function getRoleOverviewTitle(role) {
  return roleOverviewTitles[role] || "Overview";
}

export default getDashboardHeaders;
