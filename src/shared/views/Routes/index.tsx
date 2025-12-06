import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { showToast as toast } from '@/shared/utils/toast';
import { routesAPI } from '@/shared/api/routes/routes.service';
import {
  RouteWithTransfers,
  UpdateRouteRequest,
  UpdateTransferRequest,
} from '@/shared/api/routes/types';

export default function RoutesView() {
  const [loading, setLoading] = useState(true);
  const [routes, setRoutes] = useState<RouteWithTransfers[]>([]);
  const [editingRouteId, setEditingRouteId] = useState<string | null>(null);
  const [editingRouteTitle, setEditingRouteTitle] = useState<string>('');
  const [editingTransfer, setEditingTransfer] = useState<{
    routeId: string;
    transferId: string;
    transferName: string;
    max6?: number;
    max9?: number;
    max14?: number;
    estimate?: [number, number];
  } | null>(null);
  const [newTransferDrafts, setNewTransferDrafts] = useState<
    Record<string, Partial<UpdateTransferRequest>>
  >({});

  const formatEstimate = (estimate: [number, number]): string => {
    const [hours, minutes] = estimate;
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} min`;
    }
    return `${minutes} min`;
  };

  const loadRoutesWithTransfers = async () => {
    try {
      setLoading(true);

      const routesResponse = await routesAPI.getRoutes();
      const routesList = routesResponse.data;

      const routesWithTransfers = await Promise.all(
        routesList.data.map(async route => {
          try {
            const transfers = await routesAPI.getRouteTransfers(route.id);
            return { ...route, transfers };
          } catch (error) {
            console.error(
              `Failed to load transfers for route ${route.id}:`,
              error,
            );
            return {
              ...route,
              transfers: { message: 'Failed to load', data: [] },
            };
          }
        }),
      );

      setRoutes(routesWithTransfers);
    } catch (error) {
      console.error('Failed to load routes:', error);
      toast.error('Failed to load routes');
    } finally {
      setLoading(false);
    }
  };

  // Toggle route status locally (move between active/inactive tabs) without calling API
  const handleToggleRouteStatusLocal = (routeId: string) => {
    setRoutes(prev =>
      prev.map(r => (r.id === routeId ? { ...r, status: !r.status } : r)),
    );
  };

  const handleUpdateRoute = async (
    routeId: string,
    updated: Partial<UpdateRouteRequest>,
  ) => {
    try {
      setLoading(true);
      await routesAPI.updateRoute(routeId, updated as UpdateRouteRequest);
      // optimistic refresh
      await loadRoutesWithTransfers();
      setEditingRouteId(null);
    } catch (error) {
      console.error('Failed to update route:', error);
      toast.error('Failed to update route');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTransfer = async (
    routeId: string,
    transferId: string,
    updated: Partial<UpdateTransferRequest>,
  ) => {
    try {
      setLoading(true);
      const updatedTransfer = await routesAPI.updateRouteTransfer(
        routeId,
        transferId,
        updated as UpdateTransferRequest,
      );
      // update local state without collapsing accordion
      setRoutes(prev =>
        prev.map(r =>
          r.id === routeId
            ? {
                ...r,
                transfers: {
                  ...r.transfers,
                  data: r.transfers.data.map(t =>
                    t.id === transferId ? updatedTransfer : t,
                  ),
                },
              }
            : r,
        ),
      );
      setEditingTransfer(null);
    } catch (error) {
      console.error('Failed to update transfer:', error);
      toast.error('Failed to update transfer');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransfer = async (routeId: string) => {
    try {
      setLoading(true);
      const draft = newTransferDrafts[routeId] || {};
      const created = await routesAPI.createRouteTransferPartial(
        routeId,
        draft,
      );
      // append to local state
      setRoutes(prev =>
        prev.map(r =>
          r.id === routeId
            ? {
                ...r,
                transfers: {
                  ...r.transfers,
                  data: [...r.transfers.data, created],
                },
              }
            : r,
        ),
      );
      setNewTransferDrafts(prev => {
        const copy = { ...prev };
        delete copy[routeId];
        return copy;
      });
    } catch (error) {
      console.error('Failed to add transfer:', error);
      toast.error('Failed to add transfer');
    } finally {
      setLoading(false);
    }
  };

  const handleAddRoute = async () => {
    try {
      setLoading(true);
      // create empty route draft
      await routesAPI.createRoute({
        name: 'New Route',
        start_point: '',
        end_point: '',
        distance: 0,
        duration: 0,
        price: 0,
      });
      // refresh list
      await loadRoutesWithTransfers();
    } catch (error) {
      console.error('Failed to add route:', error);
      toast.error('Failed to add route');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRoute = async (routeId: string) => {
    try {
      setLoading(true);
      await routesAPI.deleteRoute(routeId);
      await loadRoutesWithTransfers();
    } catch (error) {
      console.error('Failed to delete route:', error);
      toast.error('Failed to delete route');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoutesWithTransfers();
  }, []);

  const activeRoutes = routes.filter(route => route.status);
  const inactiveRoutes = routes.filter(route => !route.status);

  const renderRoutesTable = (
    routesList: RouteWithTransfers[],
    isInactive = false,
  ) => (
    <div className="space-y-4">
      {routesList.map(route => (
        <Accordion key={route.id} type="single" collapsible>
          <AccordionItem value={route.id} className="w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {editingRouteId === route.id ? (
                  <input
                    className="bg-transparent border rounded px-2 py-1 text-xl font-semibold"
                    value={editingRouteTitle}
                    onChange={e => setEditingRouteTitle(e.target.value)}
                  />
                ) : (
                  <AccordionTrigger className="text-xl font-semibold">
                    {route.title}
                  </AccordionTrigger>
                )}
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open options</span>
                    &#x2022;&#x2022;&#x2022;
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-48">
                  <div className="flex flex-col gap-2">
                    {editingRouteId === route.id ? (
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          onClick={() =>
                            handleUpdateRoute(route.id, {
                              title: editingRouteTitle,
                            })
                          }
                        >
                          Save
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setEditingRouteId(null);
                            setEditingRouteTitle('');
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setEditingRouteId(route.id);
                          setEditingRouteTitle(route.title);
                        }}
                      >
                        Edit Route
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      onClick={() => handleToggleRouteStatusLocal(route.id)}
                    >
                      {isInactive ? 'Move to Active' : 'Move to Inactive'}
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteRoute(route.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <AccordionContent>
              {route.transfers.data && route.transfers.data.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transfer Name</TableHead>
                      <TableHead>Max 6 Pass</TableHead>
                      <TableHead>Max 9 Pass</TableHead>
                      <TableHead>Max 14 Pass</TableHead>
                      <TableHead>Estimate</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {route.transfers.data.map(transfer => (
                      <TableRow key={transfer.id}>
                        <TableCell>
                          {editingTransfer &&
                          editingTransfer.transferId === transfer.id ? (
                            <div className="flex flex-col gap-2">
                              <input
                                className="bg-transparent border rounded px-2 py-1"
                                value={editingTransfer.transferName}
                                onChange={e =>
                                  setEditingTransfer(prev =>
                                    prev
                                      ? {
                                          ...prev,
                                          transferName: e.target.value,
                                        }
                                      : null,
                                  )
                                }
                              />
                              <div className="flex gap-2">
                                <input
                                  type="number"
                                  className="bg-transparent border rounded px-2 py-1 w-24"
                                  value={editingTransfer.max6 ?? transfer.max6}
                                  onChange={e =>
                                    setEditingTransfer(prev =>
                                      prev
                                        ? {
                                            ...prev,
                                            max6: Number(e.target.value),
                                          }
                                        : null,
                                    )
                                  }
                                />
                                <input
                                  type="number"
                                  className="bg-transparent border rounded px-2 py-1 w-24"
                                  value={editingTransfer.max9 ?? transfer.max9}
                                  onChange={e =>
                                    setEditingTransfer(prev =>
                                      prev
                                        ? {
                                            ...prev,
                                            max9: Number(e.target.value),
                                          }
                                        : null,
                                    )
                                  }
                                />
                                <input
                                  type="number"
                                  className="bg-transparent border rounded px-2 py-1 w-24"
                                  value={
                                    editingTransfer.max14 ?? transfer.max14
                                  }
                                  onChange={e =>
                                    setEditingTransfer(prev =>
                                      prev
                                        ? {
                                            ...prev,
                                            max14: Number(e.target.value),
                                          }
                                        : null,
                                    )
                                  }
                                />
                              </div>
                              <div className="flex gap-2">
                                <input
                                  type="number"
                                  className="bg-transparent border rounded px-2 py-1 w-16"
                                  value={
                                    editingTransfer.estimate
                                      ? editingTransfer.estimate[0]
                                      : transfer.estimate[0]
                                  }
                                  onChange={e =>
                                    setEditingTransfer(prev =>
                                      prev
                                        ? {
                                            ...prev,
                                            estimate: [
                                              Number(e.target.value),
                                              prev.estimate
                                                ? prev.estimate[1]
                                                : transfer.estimate[1],
                                            ],
                                          }
                                        : null,
                                    )
                                  }
                                />
                                <input
                                  type="number"
                                  className="bg-transparent border rounded px-2 py-1 w-16"
                                  value={
                                    editingTransfer.estimate
                                      ? editingTransfer.estimate[1]
                                      : transfer.estimate[1]
                                  }
                                  onChange={e =>
                                    setEditingTransfer(prev =>
                                      prev
                                        ? {
                                            ...prev,
                                            estimate: [
                                              prev.estimate
                                                ? prev.estimate[0]
                                                : transfer.estimate[0],
                                              Number(e.target.value),
                                            ],
                                          }
                                        : null,
                                    )
                                  }
                                />
                              </div>
                            </div>
                          ) : (
                            transfer.transferName
                          )}
                        </TableCell>
                        <TableCell>${transfer.max6}</TableCell>
                        <TableCell>${transfer.max9}</TableCell>
                        <TableCell>${transfer.max14}</TableCell>
                        <TableCell>
                          {formatEstimate(transfer.estimate)}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {editingTransfer &&
                            editingTransfer.transferId === transfer.id ? (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleUpdateTransfer(
                                      route.id,
                                      transfer.id,
                                      {
                                        transferName:
                                          editingTransfer!.transferName,
                                        max6: editingTransfer!.max6,
                                        max9: editingTransfer!.max9,
                                        max14: editingTransfer!.max14,
                                        estimate: editingTransfer!.estimate,
                                      },
                                    )
                                  }
                                >
                                  Save
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setEditingTransfer(null)}
                                >
                                  Cancel
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    setEditingTransfer({
                                      routeId: route.id,
                                      transferId: transfer.id,
                                      transferName: transfer.transferName,
                                      max6: transfer.max6,
                                      max9: transfer.max9,
                                      max14: transfer.max14,
                                      estimate: transfer.estimate,
                                    })
                                  }
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={async () => {
                                    try {
                                      await routesAPI.deleteRouteTransfer(
                                        route.id,
                                        transfer.id,
                                      );
                                      await loadRoutesWithTransfers();
                                    } catch (e) {
                                      console.error(e);
                                      toast.error('Failed to delete transfer');
                                    }
                                  }}
                                >
                                  Delete
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}

                    {/* draft row for new transfer (render below existing transfers) */}
                    {newTransferDrafts[route.id] && (
                      <TableRow key={`draft-${route.id}`}>
                        <TableCell>
                          <input
                            className="bg-transparent border rounded px-2 py-1"
                            value={
                              newTransferDrafts[route.id].transferName || ''
                            }
                            onChange={e =>
                              setNewTransferDrafts(prev => ({
                                ...prev,
                                [route.id]: {
                                  ...(prev[route.id] || {}),
                                  transferName: e.target.value,
                                },
                              }))
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            type="number"
                            className="bg-transparent border rounded px-2 py-1 w-24"
                            value={newTransferDrafts[route.id].max6 ?? 0}
                            onChange={e =>
                              setNewTransferDrafts(prev => ({
                                ...prev,
                                [route.id]: {
                                  ...(prev[route.id] || {}),
                                  max6: Number(e.target.value),
                                },
                              }))
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            type="number"
                            className="bg-transparent border rounded px-2 py-1 w-24"
                            value={newTransferDrafts[route.id].max9 ?? 0}
                            onChange={e =>
                              setNewTransferDrafts(prev => ({
                                ...prev,
                                [route.id]: {
                                  ...(prev[route.id] || {}),
                                  max9: Number(e.target.value),
                                },
                              }))
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            type="number"
                            className="bg-transparent border rounded px-2 py-1 w-24"
                            value={newTransferDrafts[route.id].max14 ?? 0}
                            onChange={e =>
                              setNewTransferDrafts(prev => ({
                                ...prev,
                                [route.id]: {
                                  ...(prev[route.id] || {}),
                                  max14: Number(e.target.value),
                                },
                              }))
                            }
                          />
                        </TableCell>
                        <TableCell className="flex gap-2">
                          <input
                            type="number"
                            className="bg-transparent border rounded px-2 py-1 w-16"
                            value={
                              (newTransferDrafts[route.id].estimate &&
                                newTransferDrafts[route.id].estimate![0]) ??
                              0
                            }
                            onChange={e =>
                              setNewTransferDrafts(prev => ({
                                ...prev,
                                [route.id]: {
                                  ...(prev[route.id] || {}),
                                  estimate: [
                                    Number(e.target.value),
                                    (prev[route.id]?.estimate &&
                                      prev[route.id]!.estimate![1]) ||
                                      0,
                                  ],
                                },
                              }))
                            }
                          />
                          <input
                            type="number"
                            className="bg-transparent border rounded px-2 py-1 w-16"
                            value={
                              (newTransferDrafts[route.id].estimate &&
                                newTransferDrafts[route.id].estimate![1]) ??
                              0
                            }
                            onChange={e =>
                              setNewTransferDrafts(prev => ({
                                ...prev,
                                [route.id]: {
                                  ...(prev[route.id] || {}),
                                  estimate: [
                                    (prev[route.id]?.estimate &&
                                      prev[route.id]!.estimate![0]) ||
                                      0,
                                    Number(e.target.value),
                                  ],
                                },
                              }))
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleAddTransfer(route.id)}
                            >
                              Save
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setNewTransferDrafts(prev => {
                                  const copy = { ...prev };
                                  delete copy[route.id];
                                  return copy;
                                })
                              }
                            >
                              Cancel
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No transfers available for this route
                </div>
              )}
              <Button
                variant="outline"
                className="mt-4"
                onClick={() =>
                  setNewTransferDrafts(prev => ({
                    ...prev,
                    [route.id]: prev[route.id] || {},
                  }))
                }
              >
                Add New Transfer
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <SkeletonCard className="aspect-video rounded-xl bg-muted/50 h-full w-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="w-full">
        <Tabs
          defaultValue="active"
          className="w-full flex flex-col items-center"
        >
          <TabsList className="w-fit">
            <TabsTrigger value="active">
              Active ({activeRoutes.length})
            </TabsTrigger>
            <TabsTrigger value="inactive">
              Inactive ({inactiveRoutes.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent className="w-full" value="active">
            <div className="flex gap-4 mb-4">
              <Button variant="outline" onClick={handleAddRoute}>
                Add New Route
              </Button>
            </div>
            {activeRoutes.length > 0 ? (
              renderRoutesTable(activeRoutes)
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No active routes found
              </div>
            )}
          </TabsContent>
          <TabsContent className="w-full" value="inactive">
            {inactiveRoutes.length > 0 ? (
              renderRoutesTable(inactiveRoutes, true)
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No inactive routes found
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
