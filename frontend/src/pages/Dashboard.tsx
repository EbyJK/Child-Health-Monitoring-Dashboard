import { useEffect, useMemo, useState,useRef } from "react";
import api from "../services/api";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ChildForm from "../components/ChildForm";
import ChildCard from "../components/ChildCard";
import ChildDetails from "../components/ChildDetails";
import LatestHealthCard from "../components/LatestHealthCard";
import HealthRecordForm from "../components/HealthRecordForm";
import type { Child } from "../types/child.types";
import type { HealthRecord } from "../types/healthRecord.types";
import HealthHistory from "../components/HealthHistory";

function Dashboard() {
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [editingChild, setEditingChild] = useState<Child | null>(null);
  const [latestRecord, setLatestRecord] = useState<HealthRecord | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const fetchChildren = async () => {
    try {
      setLoading(true);
      const res = await api.get("/children");
      setChildren(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestRecord = async (childId: string) => {
    try {
      const res = await api.get(`/health-records/latest/${childId}`);
      setLatestRecord(res.data);
    } catch (err) {
      console.error(err);
      setLatestRecord(null);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  const filteredChildren = useMemo(
    () =>
      children.filter((c) =>
        c.fullName.toLowerCase().includes(search.toLowerCase())
      ),
    [children, search]
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <div className="max-w-7xl mx-auto px-6 mt-6">

  <div className="grid md:grid-cols-3 gap-5">

    <div className="bg-white rounded-xl shadow-lg p-5">
      <h2 className="text-gray-500">
         Total Children
      </h2>

      <p className="text-3xl font-bold mt-2">
        {children.length}
      </p>
    </div>
  <div>
    <SearchBar
      search={search}
      setSearch={setSearch}
    />
  </div>
    
  </div>

</div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-5">
            <div ref={formRef}>
                <ChildForm onChildAdded={fetchChildren} editingChild={editingChild} clearEditing={() => setEditingChild(null)}/>


            </div>
            
            

            {loading && <p>Loading children...</p>}

            {!loading && filteredChildren.length === 0 && (
              <div className="bg-white rounded-xl p-6 shadow text-center text-gray-500">
                No children found.
              </div>
            )}

            <div className="space-y-4">
              {filteredChildren.map((child) => (
                <ChildCard
                  key={child._id}
                  child={child}
                  onView={() => {
                    setSelectedChild(child);
                    fetchLatestRecord(child._id);
                  }}
                  onEdit={() => {setEditingChild(child);
                    formRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  onDelete={fetchChildren}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {selectedChild ? (
              <>
                <ChildDetails child={selectedChild} />

                {latestRecord ? (
                  <LatestHealthCard record={latestRecord} />
                ) : (
                  <div className="bg-white rounded-xl shadow p-6 text-gray-500">
                    No health records found.
                  </div>
                )}

                <HealthRecordForm
                  childId={selectedChild._id}
                  onRecordAdded={() =>
                    fetchLatestRecord(selectedChild._id)
                  }
                />
                <HealthHistory childId={selectedChild._id} />
              </>
            ) : (
              <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
                Click a card to view details.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
